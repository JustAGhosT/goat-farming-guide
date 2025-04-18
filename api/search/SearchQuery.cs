using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure;
using Azure.Search.Documents;
using Azure.Search.Documents.Models;
using GoatFarmingGuide.Api.Shared;

namespace GoatFarmingGuide.Api
{
    public static class SearchQuery
    {
        public class SearchDocument
        {
            [JsonProperty("id")]
            public string Id { get; set; }

            [JsonProperty("title")]
            public string Title { get; set; }

            [JsonProperty("content")]
            public string Content { get; set; }

            [JsonProperty("url")]
            public string Url { get; set; }
        }

        public class SearchResultItem
        {
            [JsonProperty("id")]
            public string Id { get; set; }

            [JsonProperty("title")]
            public string Title { get; set; }

            [JsonProperty("snippet")]
            public string Snippet { get; set; }

            [JsonProperty("url")]
            public string Url { get; set; }

            [JsonProperty("score")]
            public double Score { get; set; }
        }

        [FunctionName("SearchQuery")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "search/query")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Processing search query request");
            string query = req.Query["query"];

            if (string.IsNullOrEmpty(query))
            {
                return new BadRequestObjectResult(new { message = "Query parameter is required" });
            }

            try
            {
                // Create a search client
                var credential = new AzureKeyCredential(Config.SearchApiKey);
                var searchClient = new SearchClient(
                    new Uri(Config.SearchEndpoint),
                    Config.SearchIndexName,
                    credential);

                // Perform the search
                var searchOptions = new SearchOptions
                {
                    IncludeTotalCount = true,
                    Size = 50,
                    QueryType = SearchQueryType.Full,
                    HighlightFields = { "content" }
                };
                searchOptions.Select.Add("id");
                searchOptions.Select.Add("title");
                searchOptions.Select.Add("content");
                searchOptions.Select.Add("url");
                searchOptions.SearchFields.Add("title");
                searchOptions.SearchFields.Add("content");

                var searchResults = await searchClient.SearchAsync<SearchDocument>(query, searchOptions);
                var results = new List<SearchResultItem>();

                await foreach (var result in searchResults.GetResultsAsync())
                {
                    var document = result.Document;
                    string snippet = "";

                    // Extract highlighted snippet or use the first 200 characters of content
                    if (result.Highlights != null && result.Highlights.TryGetValue("content", out var highlights) && highlights.Count > 0)
                    {
                        snippet = string.Join("...", highlights);
                    }
                    else if (!string.IsNullOrEmpty(document.Content))
                    {
                        snippet = document.Content.Length > 200
                            ? document.Content.Substring(0, 200) + "..."
                            : document.Content;
                    }

                    results.Add(new SearchResultItem
                    {
                        Id = document.Id,
                        Title = document.Title,
                        Snippet = snippet,
                        Url = document.Url,
                        Score = result.Score ?? 0
                    });
                }

                return new OkObjectResult(results);
            }
            catch (Exception ex)
            {
                log.LogError($"Search error: {ex.Message}");
                return new ObjectResult(new { message = "Error performing search" })
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
    }
}