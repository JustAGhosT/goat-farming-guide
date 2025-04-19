namespace GoatFarmingGuide.Api
{
    public interface ISearchService
    {
        /// <summary>
        /// Performs a search query
        /// </summary>
        /// <param name="query">The search query</param>
        /// <returns>A list of search results</returns>
        Task<IEnumerable<SearchResult>> SearchAsync(string query);

        /// <summary>
        /// Gets search suggestions
        /// </summary>
        /// <param name="query">The partial search query</param>
        /// <returns>A list of search suggestions</returns>
        Task<IEnumerable<string>> GetSuggestionsAsync(string query);
    }

    public class SearchResult
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Snippet { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public double Score { get; set; }
    }
}
