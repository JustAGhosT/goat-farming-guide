using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Config;

namespace GoatFarmingGuide.Database.Repositories
{
    public abstract class CosmosDbRepository
    {
        protected readonly Container _container;
        protected readonly ILogger _logger;

        protected CosmosDbRepository(CosmosClient cosmosClient, DatabaseSettings settings, ILogger logger)
        {
            if (cosmosClient == null) throw new ArgumentNullException(nameof(cosmosClient));
            if (settings == null) throw new ArgumentNullException(nameof(settings));
            if (string.IsNullOrEmpty(settings.DatabaseId)) throw new ArgumentException("Database ID cannot be null or empty", nameof(settings.DatabaseId));
            if (string.IsNullOrEmpty(settings.ContainerId)) throw new ArgumentException("Container ID cannot be null or empty", nameof(settings.ContainerId));

            _container = cosmosClient.GetContainer(settings.DatabaseId, settings.ContainerId);
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        protected async Task<T?> GetItemAsync<T>(string id, string partitionKey)
        {
            try
            {
                ItemResponse<T> response = await _container.ReadItemAsync<T>(id, new PartitionKey(partitionKey));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogWarning($"Item with id {id} not found");
                return default;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting item with id {id}");
                throw;
            }
        }

        protected async Task<IEnumerable<T>> QueryItemsAsync<T>(string queryText, QueryDefinition queryDefinition)
        {
            List<T> results = new List<T>();

            try
            {
                _logger.LogInformation($"Executing query: {queryText}");

                FeedIterator<T> queryResultSetIterator = _container.GetItemQueryIterator<T>(queryDefinition);

                while (queryResultSetIterator.HasMoreResults)
                {
                    FeedResponse<T> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                    foreach (T item in currentResultSet)
                    {
                        results.Add(item);
                    }
                }

                _logger.LogInformation($"Query returned {results.Count} items");
                return results;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error executing query: {queryText}");
                throw;
            }
        }

        protected async Task<T> CreateItemAsync<T>(T item, string partitionKey)
        {
            try
            {
                ItemResponse<T> response = await _container.CreateItemAsync<T>(item, new PartitionKey(partitionKey));
                _logger.LogInformation($"Item created with id {response.Resource}");
                return response.Resource;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating item");
                throw;
            }
        }

        protected async Task<T> UpdateItemAsync<T>(string id, T item, string partitionKey)
        {
            try
            {
                ItemResponse<T> response = await _container.ReplaceItemAsync<T>(item, id, new PartitionKey(partitionKey));
                _logger.LogInformation($"Item updated with id {id}");
                return response.Resource;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating item with id {id}");
                throw;
            }
        }

        protected async Task<bool> DeleteItemAsync(string id, string partitionKey)
        {
            try
            {
                await _container.DeleteItemAsync<object>(id, new PartitionKey(partitionKey));
                _logger.LogInformation($"Item deleted with id {id}");
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogWarning($"Item with id {id} not found for deletion");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting item with id {id}");
                throw;
            }
        }
    }
}
