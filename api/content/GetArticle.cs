using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Cosmos;

namespace GoatFarmingGuide.Api
{
    public static class GetArticle
    {
        private static readonly string CosmosConnectionString = Environment.GetEnvironmentVariable("COSMOS_CONNECTION_STRING");
        private static readonly string DatabaseId = Environment.GetEnvironmentVariable("COSMOS_DATABASE_ID");
        private static readonly string ContainerId = Environment.GetEnvironmentVariable("COSMOS_CONTAINER_ID");
        private static readonly CosmosClient Client = new CosmosClient(CosmosConnectionString);
        private static readonly Container Container = Client.GetContainer(DatabaseId, ContainerId);

        public class Article
        {
            [JsonProperty("id")]
            public string Id { get; set; }

            [JsonProperty("topicSlug")]
            public string TopicSlug { get; set; }

            [JsonProperty("slug")]
            public string Slug { get; set; }

            [JsonProperty("title")]
            public string Title { get; set; }

            [JsonProperty("content")]
            public string Content { get; set; }
        }

        private static bool AuthenticateUser(HttpRequest req)
        {
            string authHeader = req.Headers["Authorization"];
            if (string.IsNullOrEmpty(authHeader) || authHeader != "Bearer hardcoded-token")
            {
                return false;
            }
            return true;
        }

        [FunctionName("GetArticle")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            if (!AuthenticateUser(req))
            {
                return new UnauthorizedResult();
            }

            string topicSlug = req.Query["topicSlug"];
            string articleSlug = req.Query["articleSlug"];

            log.LogInformation($"Received request with topicSlug: {topicSlug}, articleSlug: {articleSlug}");

            if (string.IsNullOrEmpty(topicSlug) || string.IsNullOrEmpty(articleSlug))
            {
                return new BadRequestObjectResult("Topic slug and article slug are required.");
            }

            try
            {
                QueryDefinition queryDefinition = new QueryDefinition(
                    "SELECT * FROM c WHERE c.topicSlug = @topicSlug AND c.slug = @articleSlug")
                    .WithParameter("@topicSlug", topicSlug)
                    .WithParameter("@articleSlug", articleSlug);

                log.LogInformation($"Executing query: {queryDefinition.QueryText}");

                FeedIterator<Article> queryResultSetIterator = Container.GetItemQueryIterator<Article>(queryDefinition);
                List<Article> articles = new List<Article>();

                while (queryResultSetIterator.HasMoreResults)
                {
                    FeedResponse<Article> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                    foreach (Article article in currentResultSet)
                    {
                        articles.Add(article);
                    }
                }

                log.LogInformation($"Fetched articles: {JsonConvert.SerializeObject(articles)}");

                if (articles.Count == 0)
                {
                    return new NotFoundObjectResult("Article not found.");
                }

                return new OkObjectResult(articles[0]);
            }
            catch (Exception ex)
            {
                log.LogError($"Error fetching article details: {ex.Message}");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}