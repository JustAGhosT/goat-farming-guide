using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Database.Repositories
{
    public interface IBlogRepository
    {
        /// <summary>
        /// Gets all blog posts
        /// </summary>
        /// <returns>A list of blog posts</returns>
        Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync();

        /// <summary>
        /// Gets a blog post by ID
        /// </summary>
        /// <param name="id">The blog post ID</param>
        /// <returns>The blog post if found, null otherwise</returns>
        Task<BlogPost?> GetBlogPostByIdAsync(string id);

        /// <summary>
        /// Creates a new blog post
        /// </summary>
        /// <param name="blogPost">The blog post to create</param>
        /// <returns>The created blog post</returns>
        Task<BlogPost> CreateBlogPostAsync(BlogPost blogPost);

        /// <summary>
        /// Updates an existing blog post
        /// </summary>
        /// <param name="blogPost">The blog post to update</param>
        /// <returns>The updated blog post</returns>
        Task<BlogPost> UpdateBlogPostAsync(BlogPost blogPost);

        /// <summary>
        /// Deletes a blog post
        /// </summary>
        /// <param name="id">The blog post ID</param>
        /// <returns>True if deleted, false otherwise</returns>
        Task<bool> DeleteBlogPostAsync(string id);
    }
}
