using System.Collections.Generic;
using System.Threading.Tasks;
using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Api.Services
{
    public interface IBlogProvider
    {
        Task<BlogPost> GetBlogPostByIdAsync(string id);
        Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync();
        Task<BlogPost> CreateBlogPostAsync(BlogPost blogPost);
        Task<BlogPost> UpdateBlogPostAsync(BlogPost blogPost);
        Task<bool> DeleteBlogPostAsync(string id);
        string SourceName { get; }
    }
}
