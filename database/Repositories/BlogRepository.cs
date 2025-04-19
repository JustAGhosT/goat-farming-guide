using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Config;
using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Database.Repositories
{
    public class BlogRepository : CosmosDbRepository, IBlogRepository
    {
        public BlogRepository(CosmosClient cosmosClient, DatabaseSettings settings, ILogger<BlogRepository> logger)
            : base(cosmosClient, settings, logger)
        {
        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync()
        {
            var queryText = "SELECT * FROM c WHERE c.type = 'blogPost' ORDER BY c.createdAt DESC";
            var queryDefinition = new QueryDefinition(queryText);

            return await QueryItemsAsync<BlogPost>(queryText, queryDefinition);
        }

        public async Task<BlogPost?> GetBlogPostByIdAsync(string id)
        {
            return await GetItemAsync<BlogPost>(id, id);
        }

        public async Task<BlogPost> CreateBlogPostAsync(BlogPost blogPost)
        {
            if (string.IsNullOrEmpty(blogPost.Id))
            {
                blogPost.Id = Guid.NewGuid().ToString();
            }

            blogPost.CreatedAt = DateTime.UtcNow.ToString("o");
            blogPost.LastUpdated = blogPost.CreatedAt;

            return await CreateItemAsync(blogPost, blogPost.Id);
        }

        public async Task<BlogPost> UpdateBlogPostAsync(BlogPost blogPost)
        {
            blogPost.LastUpdated = DateTime.UtcNow.ToString("o");
            return await UpdateItemAsync(blogPost.Id, blogPost, blogPost.Id);
        }

        public async Task<bool> DeleteBlogPostAsync(string id)
        {
            return await DeleteItemAsync(id, id);
        }
    }
}
