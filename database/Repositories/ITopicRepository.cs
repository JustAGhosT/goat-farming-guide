using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Database.Repositories
{
    public interface ITopicRepository
    {
        /// <summary>
        /// Gets all topics
        /// </summary>
        /// <returns>A list of topics</returns>
        Task<IEnumerable<Topic>> GetAllTopicsAsync();

        /// <summary>
        /// Gets a topic by slug
        /// </summary>
        /// <param name="slug">The topic slug</param>
        /// <returns>The topic if found, null otherwise</returns>
        Task<Topic?> GetTopicBySlugAsync(string slug);

        /// <summary>
        /// Creates a new topic
        /// </summary>
        /// <param name="topic">The topic to create</param>
        /// <returns>The created topic</returns>
        Task<Topic> CreateTopicAsync(Topic topic);

        /// <summary>
        /// Updates an existing topic
        /// </summary>
        /// <param name="topic">The topic to update</param>
        /// <returns>The updated topic</returns>
        Task<Topic> UpdateTopicAsync(Topic topic);

        /// <summary>
        /// Deletes a topic
        /// </summary>
        /// <param name="id">The topic ID</param>
        /// <returns>True if deleted, false otherwise</returns>
        Task<bool> DeleteTopicAsync(string id);
    }
}