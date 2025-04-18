using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Cosmos;
using GoatFarmingGuide.Api.Shared;

namespace GoatFarmingGuide.Api
{
    public static class GetRelated
    {
        public class RelatedArticle
        {
            [JsonProperty("id")]
            public string Id { get; set; }

            [JsonProperty("topicSlug")]
            public string TopicSlug { get; set; }

            [JsonProperty("title")]
            public string Title { get; set; }

            [JsonProperty("excerpt")]
            public string Excerpt { get; set; }

            [JsonProperty("slug")]
            public string Slug { get; set; }
        }

        [FunctionName("GetRelated")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "related")] HttpRequest req,
            ILogger log)
        {
            string topicSlug = req.Query["topicSlug"];

            log.LogInformation($"Received request with topicSlug: {topicSlug}");

            if (string.IsNullOrEmpty(topicSlug))
            {
                return new BadRequestObjectResult("Topic slug is required.");
            }

            try
            {
                QueryDefinition queryDefinition = new QueryDefinition(
                    "SELECT * FROM c WHERE c.topicSlug = @topicSlug")
                    .WithParameter("@topicSlug", topicSlug);

                log.LogInformation($"Executing query: {queryDefinition.QueryText}");

                FeedIterator<RelatedArticle> queryResultSetIterator = DbContext.Container.GetItemQueryIterator<RelatedArticle>(queryDefinition);
                List<RelatedArticle> relatedArticles = new List<RelatedArticle>();

                while (queryResultSetIterator.HasMoreResults)
                {
                    FeedResponse<RelatedArticle> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                    foreach (RelatedArticle article in currentResultSet)
                    {
                        relatedArticles.Add(article);
                    }
                }

                log.LogInformation($"Fetched related articles: {JsonConvert.SerializeObject(relatedArticles)}");

                if (relatedArticles.Count == 0)
                {
                    return new NotFoundObjectResult("No related articles found.");
                }

                return new OkObjectResult(relatedArticles);
            }
            catch (Exception ex)
            {
                log.LogError($"Error fetching related articles: {ex.Message}");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}