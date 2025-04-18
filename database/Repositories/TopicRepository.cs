using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Config;
using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Database.Repositories
{
    public class TopicRepository : CosmosDbRepository, ITopicRepository
    {
        public TopicRepository(CosmosClient cosmosClient, DatabaseSettings settings, ILogger<TopicRepository> logger)
            : base(cosmosClient, settings, logger)
        {
        }

        public async Task<IEnumerable<Topic>> GetAllTopicsAsync()
        {
            var queryText = "SELECT * FROM c WHERE c.type = 'topic'";
            var queryDefinition = new QueryDefinition(queryText);

            return await QueryItemsAsync<Topic>(queryText, queryDefinition);
        }

        public async Task<Topic?> GetTopicBySlugAsync(string slug)
        {
            var queryText = "SELECT * FROM c WHERE c.type = 'topic' AND c.slug = @slug";
            var queryDefinition = new QueryDefinition(queryText)
                .WithParameter("@slug", slug);

            var topics = await QueryItemsAsync<Topic>(queryText, queryDefinition);
            return topics.FirstOrDefault();
        }

        public async Task<Topic> CreateTopicAsync(Topic topic)
        {
            if (string.IsNullOrEmpty(topic.Id))
            {
                topic.Id = Guid.NewGuid().ToString();
            }

            topic.Type = "topic";

            return await CreateItemAsync(topic, topic.Id);
        }

        public async Task<Topic> UpdateTopicAsync(Topic topic)
        {
            topic.Type = "topic";
            return await UpdateItemAsync(topic.Id, topic, topic.Id);
        }

        public async Task<bool> DeleteTopicAsync(string id)
        {
            return await DeleteItemAsync(id, id);
        }
    }
}