using System;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace GoatFarmingGuide.Api.Shared
{
    public static class DbContext
    {
        private static readonly CosmosClient Client = new CosmosClient(Config.CosmosConnectionString);
        public static readonly Database Database = Client.GetDatabase(Config.DatabaseId);
        public static readonly Container Container = Database.GetContainer(Config.ContainerId);

        public static async Task ConnectToDatabaseAsync(ILogger log)
        {
            try
            {
                // Create database if it doesn't exist
                await Client.CreateDatabaseIfNotExistsAsync(Config.DatabaseId);

                // Create container if it doesn't exist
                await Database.CreateContainerIfNotExistsAsync(Config.ContainerId, "/id");

                log.LogInformation("Connected to database");
            }
            catch (Exception ex)
            {
                log.LogError($"Error connecting to database: {ex.Message}");
                throw;
            }
        }
    }
}
