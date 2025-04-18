using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace GoatFarmingGuide.Api.Functions
{
    public class SearchSuggestFunction
    {
        private readonly ISearchService _searchService;
        private readonly ILogger<SearchSuggestFunction> _logger;

        public SearchSuggestFunction(
            ISearchService searchService,
            ILogger<SearchSuggestFunction> logger)
        {
            _searchService = searchService ?? throw new ArgumentNullException(nameof(searchService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [FunctionName("SearchSuggest")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "search/suggest")] HttpRequest req)
        {
            _logger.LogInformation("Processing search suggestion request");

            string query = req.Query["query"];

            if (string.IsNullOrEmpty(query))
            {
                return new BadRequestObjectResult(new { message = "Query parameter is required" });
            }

            try
            {
                var suggestions = await _searchService.GetSuggestionsAsync(query);
                return new OkObjectResult(suggestions);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching suggestions");
                return new ObjectResult(new { message = "Error fetching suggestions" })
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
    }
}