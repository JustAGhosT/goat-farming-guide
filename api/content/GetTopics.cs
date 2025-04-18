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
    public static class GetTopics
    {
        public class Topic
        {
            [JsonProperty("id")]
            public string Id { get; set; }

            [JsonProperty("type")]
            public string Type { get; set; }

            [JsonProperty("title")]
            public string Title { get; set; }

            [JsonProperty("description")]
            public string Description { get; set; }

            [JsonProperty("slug")]
            public string Slug { get; set; }
        }

        [FunctionName("GetTopics")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "topics")] HttpRequest req,
            ILogger log)
        {
            try
            {
                string query = "SELECT * FROM c WHERE c.type = 'topic'";
                log.LogInformation($"Executing query: {query}");

                QueryDefinition queryDefinition = new QueryDefinition(query);
                FeedIterator<Topic> queryResultSetIterator = DbContext.Container.GetItemQueryIterator<Topic>(queryDefinition);
                List<Topic> topics = new List<Topic>();

                while (queryResultSetIterator.HasMoreResults)
                {
                    FeedResponse<Topic> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                    foreach (Topic topic in currentResultSet)
                    {
                        topics.Add(topic);
                    }
                }

                log.LogInformation($"Fetched topics: {JsonConvert.SerializeObject(topics)}");

                return new OkObjectResult(topics);
            }
            catch (Exception ex)
            {
                log.LogError($"Error fetching topics: {ex.Message}");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}