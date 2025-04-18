using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Models;
using GoatFarmingGuide.Database.Repositories;

namespace GoatFarmingGuide.Api.Services
{
    public class DatabaseContentProvider : IContentProvider
    {
        private readonly IArticleRepository _articleRepository;
        private readonly ITopicRepository _topicRepository;
        private readonly IGlossaryRepository _glossaryRepository;
        private readonly ILogger<DatabaseContentProvider> _logger;

        public string SourceName => "Database";

        public DatabaseContentProvider(
            IArticleRepository articleRepository,
            ITopicRepository topicRepository,
            IGlossaryRepository glossaryRepository,
            ILogger<DatabaseContentProvider> logger)
        {
            _articleRepository = articleRepository ?? throw new ArgumentNullException(nameof(articleRepository));
            _topicRepository = topicRepository ?? throw new ArgumentNullException(nameof(topicRepository));
            _glossaryRepository = glossaryRepository ?? throw new ArgumentNullException(nameof(glossaryRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<Article> GetArticleAsync(string topicSlug, string articleSlug)
        {
            _logger.LogInformation($"Fetching article from database: {topicSlug}/{articleSlug}");
            return await _articleRepository.GetArticleAsync(topicSlug, articleSlug);
        }

        public async Task<IEnumerable<Article>> GetArticlesByTopicAsync(string topicSlug)
        {
            _logger.LogInformation($"Fetching articles for topic from database: {topicSlug}");
            return await _articleRepository.GetArticlesByTopicAsync(topicSlug);
        }

        public async Task<IEnumerable<Topic>> GetTopicsAsync()
        {
            _logger.LogInformation("Fetching all topics from database");
            return await _topicRepository.GetAllTopicsAsync();
        }

        public async Task<IEnumerable<GlossaryTerm>> GetGlossaryTermsAsync()
        {
            _logger.LogInformation("Fetching all glossary terms from database");
            return await _glossaryRepository.GetAllTermsAsync();
        }
    }
}