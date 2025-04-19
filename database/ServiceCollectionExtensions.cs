using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Config;
using GoatFarmingGuide.Database.Repositories;

namespace GoatFarmingGuide.Database
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabaseServices(this IServiceCollection services, DatabaseSettings settings)
        {
            // Register the Cosmos DB client
            services.AddSingleton(sp =>
            {
                var loggerFactory = sp.GetRequiredService<ILoggerFactory>();
                var logger = loggerFactory.CreateLogger<CosmosClient>();

                logger.LogInformation("Creating Cosmos DB client with connection string: {ConnectionString}",
                    settings.ConnectionString.Substring(0, Math.Min(settings.ConnectionString.Length, 30)) + "...");

                return new CosmosClient(settings.ConnectionString);
            });

            // Register database settings
            services.AddSingleton(settings);

            // Register repositories
            services.AddScoped<IArticleRepository, ArticleRepository>();
            services.AddScoped<ITopicRepository, TopicRepository>();
            services.AddScoped<IGlossaryRepository, GlossaryRepository>();
            services.AddScoped<IBlogRepository, BlogRepository>();

            return services;
        }

        public static async Task InitializeDatabaseAsync(this IServiceProvider serviceProvider)
        {
            var cosmosClient = serviceProvider.GetRequiredService<CosmosClient>();
            var settings = serviceProvider.GetRequiredService<DatabaseSettings>();
            var loggerFactory = serviceProvider.GetRequiredService<ILoggerFactory>();
            var logger = loggerFactory.CreateLogger("DatabaseInitialization");

            try
            {
                // Create database if it doesn't exist
                logger.LogInformation("Creating database if it doesn't exist: {DatabaseId}", settings.DatabaseId);
                var databaseResponse = await cosmosClient.CreateDatabaseIfNotExistsAsync(settings.DatabaseId);
                var database = databaseResponse.Database;

                // Create container if it doesn't exist
                logger.LogInformation("Creating container if it doesn't exist: {ContainerId}", settings.ContainerId);
                await database.CreateContainerIfNotExistsAsync(settings.ContainerId, "/id");

                logger.LogInformation("Database initialization completed successfully");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error initializing database");
                throw;
            }
        }
    }
}
