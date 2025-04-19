using System.Collections.Generic;
using System.Threading.Tasks;
using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Api.Services
{
    public interface IContentProvider
    {
        /// <summary>
        /// Gets an article by topic slug and article slug
        /// </summary>
        Task<Article> GetArticleAsync(string topicSlug, string articleSlug);

        /// <summary>
        /// Gets all articles for a topic
        /// </summary>
        Task<IEnumerable<Article>> GetArticlesByTopicAsync(string topicSlug);

        /// <summary>
        /// Gets all topics
        /// </summary>
        Task<IEnumerable<Topic>> GetTopicsAsync();

        /// <summary>
        /// Gets all glossary terms
        /// </summary>
        Task<IEnumerable<GlossaryTerm>> GetGlossaryTermsAsync();

        /// <summary>
        /// Gets the content source name (for diagnostics)
        /// </summary>
        string SourceName { get; }
    }
}
