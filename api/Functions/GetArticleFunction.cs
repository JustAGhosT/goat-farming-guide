using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Api.Services;

namespace GoatFarmingGuide.Api.Functions
{
    public class GetArticleFunction
    {
        private readonly ContentProviderFactory _contentProviderFactory;
        private readonly ILogger<GetArticleFunction> _logger;

        public GetArticleFunction(
            ContentProviderFactory contentProviderFactory,
            ILogger<GetArticleFunction> logger)
        {
            _contentProviderFactory = contentProviderFactory ?? throw new ArgumentNullException(nameof(contentProviderFactory));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [FunctionName("GetArticle")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "article")] HttpRequest req)
        {
            _logger.LogInformation("Processing GetArticle request");

            string topicSlug = req.Query["topicSlug"];
            string articleSlug = req.Query["articleSlug"];

            if (string.IsNullOrEmpty(topicSlug) || string.IsNullOrEmpty(articleSlug))
            {
                return new BadRequestObjectResult("Please provide both topicSlug and articleSlug query parameters");
            }

            try
            {
                // Get the appropriate content provider for articles
                var contentProvider = _contentProviderFactory.GetContentProvider("article");
                _logger.LogInformation($"Using content provider: {contentProvider.SourceName}");
                var article = await contentProvider.GetArticleAsync(topicSlug, articleSlug);

                if (article == null)
                {
                    return new NotFoundResult();
                }

                return new OkObjectResult(article);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching article");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}