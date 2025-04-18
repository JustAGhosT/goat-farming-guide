using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace GoatFarmingGuide.Api.Functions
{
    public class SearchQueryFunction
    {
        private readonly ISearchService _searchService;
        private readonly ILogger<SearchQueryFunction> _logger;

        public SearchQueryFunction(
            ISearchService searchService,
            ILogger<SearchQueryFunction> logger)
        {
            _searchService = searchService ?? throw new ArgumentNullException(nameof(searchService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [FunctionName("SearchQuery")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "search/query")] HttpRequest req)
        {
            _logger.LogInformation("Processing search query request");

            string query = req.Query["query"];

            if (string.IsNullOrEmpty(query))
            {
                return new BadRequestObjectResult(new { message = "Query parameter is required" });
            }

            try
            {
                var results = await _searchService.SearchAsync(query);
                return new OkObjectResult(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error performing search");
                return new ObjectResult(new { message = "Error performing search" })
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }
        }
    }
}