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
    public class GetTopicsFunction
    {
        private readonly ITopicRepository _topicRepository;
        private readonly ILogger<GetTopicsFunction> _logger;

        public GetTopicsFunction(
            ITopicRepository topicRepository,
            ILogger<GetTopicsFunction> logger)
        {
            _topicRepository = topicRepository ?? throw new ArgumentNullException(nameof(topicRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [FunctionName("GetTopics")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "topics")] HttpRequest req)
        {
            _logger.LogInformation("Processing GetTopics request");

            try
            {
                var topics = await _topicRepository.GetAllTopicsAsync();
                return new OkObjectResult(topics);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching topics");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}