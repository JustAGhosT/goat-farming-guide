using Azure;
using Azure.Search.Documents;
using Azure.Search.Documents.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace GoatFarmingGuide.Api
{
    public class SearchService : ISearchService
    {
        private readonly ILogger<SearchService> _logger;
        private readonly SearchClient _searchClient;

        public SearchService(IConfiguration configuration, ILogger<SearchService> logger)
        {
            _logger = logger;

            string searchEndpoint = configuration["SEARCH_ENDPOINT"] ?? throw new ArgumentNullException("SEARCH_ENDPOINT");
            string searchApiKey = configuration["SEARCH_API_KEY"] ?? throw new ArgumentNullException("SEARCH_API_KEY");
            string searchIndexName = configuration["SEARCH_INDEX_NAME"] ?? throw new ArgumentNullException("SEARCH_INDEX_NAME");

            _searchClient = new SearchClient(
                new Uri(searchEndpoint),
                searchIndexName,
                new AzureKeyCredential(searchApiKey));
        }

        public async Task<IEnumerable<SearchResult>> SearchAsync(string query)
        {
            try
            {
                _logger.LogInformation("Performing search with query: {Query}", query);

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

                var searchResults = await _searchClient.SearchAsync<SearchDocument>(query, searchOptions);
                var results = new List<SearchResult>();

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

                    results.Add(new SearchResult
                    {
                        Id = document.Id,
                        Title = document.Title,
                        Snippet = snippet,
                        Url = document.Url,
                        Score = result.Score ?? 0
                    });
                }

                _logger.LogInformation("Search returned {Count} results", results.Count);
                return results;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error performing search with query: {Query}", query);
                throw;
            }
        }

        public async Task<IEnumerable<string>> GetSuggestionsAsync(string query)
        {
            try
            {
                _logger.LogInformation("Getting suggestions for query: {Query}", query);

                var suggestOptions = new SuggestOptions
                {
                    Size = 5
                };
                suggestOptions.Select.Add("title");
                suggestOptions.SearchFields.Add("title");

                var suggestResults = await _searchClient.SuggestAsync<SuggestionDocument>(query, "sg", suggestOptions);

                var suggestions = suggestResults.Value.Results.Select(result => result.Text).ToList();

                _logger.LogInformation("Suggestions returned {Count} results", suggestions.Count);
                return suggestions;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting suggestions for query: {Query}", query);
                throw;
            }
        }

        private class SearchDocument
        {
            public string Id { get; set; } = string.Empty;
            public string Title { get; set; } = string.Empty;
            public string Content { get; set; } = string.Empty;
            public string Url { get; set; } = string.Empty;
        }

        private class SuggestionDocument
        {
            public string Title { get; set; } = string.Empty;
        }
    }
}