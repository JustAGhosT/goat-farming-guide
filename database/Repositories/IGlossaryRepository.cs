using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Database.Repositories
{
    public interface IGlossaryRepository
    {
        /// <summary>
        /// Gets all glossary terms
        /// </summary>
        /// <returns>A list of glossary terms</returns>
        Task<IEnumerable<GlossaryTerm>> GetAllTermsAsync();

        /// <summary>
        /// Gets a glossary term by ID
        /// </summary>
        /// <param name="id">The term ID</param>
        /// <returns>The term if found, null otherwise</returns>
        Task<GlossaryTerm?> GetTermByIdAsync(string id);

        /// <summary>
        /// Creates a new glossary term
        /// </summary>
        /// <param name="term">The term to create</param>
        /// <returns>The created term</returns>
        Task<GlossaryTerm> CreateTermAsync(GlossaryTerm term);

        /// <summary>
        /// Updates an existing glossary term
        /// </summary>
        /// <param name="term">The term to update</param>
        /// <returns>The updated term</returns>
        Task<GlossaryTerm> UpdateTermAsync(GlossaryTerm term);

        /// <summary>
        /// Deletes a glossary term
        /// </summary>
        /// <param name="id">The term ID</param>
        /// <returns>True if deleted, false otherwise</returns>
        Task<bool> DeleteTermAsync(string id);
    }
}
