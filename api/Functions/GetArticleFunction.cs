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
    public class GetArticleFunction
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IAuthenticationService _authService;
        private readonly ILogger<GetArticleFunction> _logger;

        public GetArticleFunction(
            IArticleRepository articleRepository,
            IAuthenticationService authService,
            ILogger<GetArticleFunction> logger)
        {
            _articleRepository = articleRepository ?? throw new ArgumentNullException(nameof(articleRepository));
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [FunctionName("GetArticle")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "article")] HttpRequest req)
        {
            _logger.LogInformation("Processing GetArticle request");

            // Authentication
            string authHeader = req.Headers["Authorization"];
            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                string token = authHeader.Substring("Bearer ".Length);
                if (!_authService.ValidateToken(token))
                {
                    return new UnauthorizedResult();
                }
            }
            else
            {
                return new UnauthorizedResult();
            }

            // Get query parameters
            string topicSlug = req.Query["topicSlug"];
            string articleSlug = req.Query["articleSlug"];

            _logger.LogInformation($"Received request with topicSlug: {topicSlug}, articleSlug: {articleSlug}");

            if (string.IsNullOrEmpty(topicSlug) || string.IsNullOrEmpty(articleSlug))
            {
                return new BadRequestObjectResult("Topic slug and article slug are required.");
            }

            try
            {
                var article = await _articleRepository.GetArticleAsync(topicSlug, articleSlug);

                if (article == null)
                {
                    return new NotFoundObjectResult("Article not found.");
                }

                return new OkObjectResult(article);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching article details");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}