using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Database.Repositories
{
    public interface IArticleRepository
    {
        /// <summary>
        /// Gets an article by topic slug and article slug
        /// </summary>
        /// <param name="topicSlug">The topic slug</param>
        /// <param name="articleSlug">The article slug</param>
        /// <returns>The article if found, null otherwise</returns>
        Task<Article?> GetArticleAsync(string topicSlug, string articleSlug);

        /// <summary>
        /// Gets all articles for a topic
        /// </summary>
        /// <param name="topicSlug">The topic slug</param>
        /// <returns>A list of articles</returns>
        Task<IEnumerable<Article>> GetArticlesByTopicAsync(string topicSlug);

        /// <summary>
        /// Creates a new article
        /// </summary>
        /// <param name="article">The article to create</param>
        /// <returns>The created article</returns>
        Task<Article> CreateArticleAsync(Article article);

        /// <summary>
        /// Updates an existing article
        /// </summary>
        /// <param name="article">The article to update</param>
        /// <returns>The updated article</returns>
        Task<Article> UpdateArticleAsync(Article article);

        /// <summary>
        /// Deletes an article
        /// </summary>
        /// <param name="id">The article ID</param>
        /// <returns>True if deleted, false otherwise</returns>
        Task<bool> DeleteArticleAsync(string id);
    }
}