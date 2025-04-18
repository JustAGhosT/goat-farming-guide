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
    public static class SearchSuggest
    {
        public class SuggestionDocument
        {
            [JsonProperty("title")]
            public string Title { get; set; }
        }

        [FunctionName("SearchSuggest")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "search/suggest")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Processing search suggestion request");
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

                // Perform the suggestion search
                var suggestOptions = new SuggestOptions
                {
                    Size = 5
                };
                suggestOptions.Select.Add("title");
                suggestOptions.SearchFields.Add("title");

                var suggestResults = await searchClient.SuggestAsync<SuggestionDocument>(query, "sg", suggestOptions);

                // Extract just the suggestion text
                var suggestions = new List<string>();
                foreach (var result in suggestResults.Value.Results)
                {
                    suggestions.Add(result.Text);
                }

                return new OkObjectResult(suggestions);
            }
            catch (Exception ex)
            {
                log.LogError($"Suggestion error: {ex.Message}");
                return new ObjectResult(new { message = "Error fetching suggestions" })
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
    }
}