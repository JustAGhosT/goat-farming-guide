using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Repositories;

namespace GoatFarmingGuide.Api.Functions
{
    public class GetRelatedFunction
    {
        private readonly IArticleRepository _articleRepository;
        private readonly ILogger<GetRelatedFunction> _logger;

        public GetRelatedFunction(
            IArticleRepository articleRepository,
            ILogger<GetRelatedFunction> logger)
        {
            _articleRepository = articleRepository ?? throw new ArgumentNullException(nameof(articleRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [FunctionName("GetRelated")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "related")] HttpRequest req)
        {
            _logger.LogInformation("Processing GetRelated request");

            string topicSlug = req.Query["topicSlug"];

            _logger.LogInformation($"Received request with topicSlug: {topicSlug}");

            if (string.IsNullOrEmpty(topicSlug))
            {
                return new BadRequestObjectResult("Topic slug is required.");
            }

            try
            {
                var relatedArticles = await _articleRepository.GetArticlesByTopicAsync(topicSlug);

                if (relatedArticles == null || !relatedArticles.Any())
                {
                    return new NotFoundObjectResult("No related articles found.");
                }

                return new OkObjectResult(relatedArticles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching related articles");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}