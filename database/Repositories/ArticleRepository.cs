using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Config;
using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Database.Repositories
{
    public class ArticleRepository : CosmosDbRepository, IArticleRepository
    {
        public ArticleRepository(CosmosClient cosmosClient, DatabaseSettings settings, ILogger<ArticleRepository> logger)
            : base(cosmosClient, settings, logger)
        {
        }

        public async Task<Article?> GetArticleAsync(string topicSlug, string articleSlug)
        {
            var queryText = "SELECT * FROM c WHERE c.topicSlug = @topicSlug AND c.slug = @articleSlug";
            var queryDefinition = new QueryDefinition(queryText)
                .WithParameter("@topicSlug", topicSlug)
                .WithParameter("@articleSlug", articleSlug);

            var articles = await QueryItemsAsync<Article>(queryText, queryDefinition);
            return articles.FirstOrDefault();
        }

        public async Task<IEnumerable<Article>> GetArticlesByTopicAsync(string topicSlug)
        {
            var queryText = "SELECT * FROM c WHERE c.topicSlug = @topicSlug";
            var queryDefinition = new QueryDefinition(queryText)
                .WithParameter("@topicSlug", topicSlug);

            return await QueryItemsAsync<Article>(queryText, queryDefinition);
        }

        public async Task<Article> CreateArticleAsync(Article article)
        {
            if (string.IsNullOrEmpty(article.Id))
            {
                article.Id = Guid.NewGuid().ToString();
            }

            article.CreatedAt = DateTime.UtcNow.ToString("o");
            article.UpdatedAt = article.CreatedAt;

            return await CreateItemAsync(article, article.Id);
        }

        public async Task<Article> UpdateArticleAsync(Article article)
        {
            article.UpdatedAt = DateTime.UtcNow.ToString("o");
            return await UpdateItemAsync(article.Id, article, article.Id);
        }

        public async Task<bool> DeleteArticleAsync(string id)
        {
            return await DeleteItemAsync(id, id);
        }
    }
}