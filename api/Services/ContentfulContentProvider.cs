using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contentful.Core;
using Contentful.Core.Search;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Models;
using GoatFarmingGuide.Api.Shared;

namespace GoatFarmingGuide.Api.Services
{
    public class ContentfulContentProvider : IContentProvider
    {
        private readonly ContentfulClient _client;
        private readonly ILogger<ContentfulContentProvider> _logger;

        public string SourceName => "Contentful";

        public ContentfulContentProvider(ILogger<ContentfulContentProvider> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

            // Initialize Contentful client
            _client = new ContentfulClient(
                new HttpClient(),
                new Contentful.Core.Configuration.ContentfulOptions
                {
                    DeliveryApiKey = Config.HeadlessCMS.AccessToken,
                    SpaceId = Config.HeadlessCMS.SpaceId,
                    Environment = Config.HeadlessCMS.Environment
                });
        }

        public async Task<Article> GetArticleAsync(string topicSlug, string articleSlug)
        {
            _logger.LogInformation($"Fetching article from Contentful: {topicSlug}/{articleSlug}");

            var queryBuilder = QueryBuilder<dynamic>.New
                .ContentTypeIs("article")
                .FieldEquals("fields.topicSlug", topicSlug)
                .FieldEquals("fields.slug", articleSlug);

            var entries = await _client.GetEntries(queryBuilder);

            if (entries.Count() == 0)
                return null;

            var entry = entries.First();

            return new Article
            {
                Id = entry.SystemProperties?.Id,
                Title = entry.fields.title,
                Content = entry.fields.content,
                Slug = entry.fields.slug,
                TopicSlug = entry.fields.topicSlug,
                CreatedAt = entry.SystemProperties?.CreatedAt.ToString() ?? DateTime.UtcNow.ToString(),
                UpdatedAt = entry.SystemProperties?.UpdatedAt.ToString() ?? DateTime.UtcNow.ToString()
            };
        }

        public async Task<IEnumerable<Article>> GetArticlesByTopicAsync(string topicSlug)
        {
            _logger.LogInformation($"Fetching articles for topic from Contentful: {topicSlug}");

            var queryBuilder = QueryBuilder<dynamic>.New
                .ContentTypeIs("article")
                .FieldEquals("fields.topicSlug", topicSlug);

            var entries = await _client.GetEntries(queryBuilder);

            return entries.Select(entry => new Article
            {
                Id = entry.SystemProperties?.Id,
                Title = entry.fields.title,
                Content = entry.fields.content,
                Slug = entry.fields.slug,
                TopicSlug = entry.fields.topicSlug,
                CreatedAt = entry.SystemProperties?.CreatedAt.ToString() ?? DateTime.UtcNow.ToString(),
                UpdatedAt = entry.SystemProperties?.UpdatedAt.ToString() ?? DateTime.UtcNow.ToString()
            });
        }

        public async Task<IEnumerable<Topic>> GetTopicsAsync()
        {
            _logger.LogInformation("Fetching all topics from Contentful");

            var queryBuilder = QueryBuilder<dynamic>.New.ContentTypeIs("topic");
            var entries = await _client.GetEntries(queryBuilder);

            return entries.Select(entry => new Topic
            {
                Id = entry.SystemProperties?.Id,
                Title = entry.fields.title,
                Description = entry.fields.description,
                Slug = entry.fields.slug
            });
        }

        public async Task<IEnumerable<GlossaryTerm>> GetGlossaryTermsAsync()
        {
            _logger.LogInformation("Fetching all glossary terms from Contentful");

            var queryBuilder = QueryBuilder<dynamic>.New.ContentTypeIs("glossaryTerm");
            var entries = await _client.GetEntries(queryBuilder);

            return entries.Select(entry => new GlossaryTerm
            {
                Id = entry.SystemProperties?.Id,
                Term = entry.fields.term,
                Definition = entry.fields.definition
            });
        }
    }
}