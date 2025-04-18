using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace GoatFarmingGuide.Api.Services
{
    public class ContentProviderFactory
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;
        private readonly ILogger<ContentProviderFactory> _logger;

        public ContentProviderFactory(
            IServiceProvider serviceProvider,
            IConfiguration configuration,
            ILogger<ContentProviderFactory> logger)
        {
            _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public IContentProvider GetContentProvider(string contentType)
        {
            // Get the content source from configuration or use the default
            string defaultSource = _configuration["DEFAULT_CONTENT_SOURCE"] ?? "Database";

            // Check if there's a specific source for this content type
            string contentSource = _configuration[$"{contentType.ToUpper()}_CONTENT_SOURCE"] ?? defaultSource;

            _logger.LogInformation($"Using content source '{contentSource}' for content type '{contentType}'");

            return contentSource.ToLowerInvariant() switch
            {
                "contentful" => _serviceProvider.GetRequiredService<ContentfulContentProvider>(),
                "database" => _serviceProvider.GetRequiredService<DatabaseContentProvider>(),
                _ => _serviceProvider.GetRequiredService<DatabaseContentProvider>() // Default to database
            };
        }
    }
}