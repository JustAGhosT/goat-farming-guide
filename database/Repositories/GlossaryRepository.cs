using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Config;
using GoatFarmingGuide.Database.Models;

namespace GoatFarmingGuide.Database.Repositories
{
    public class GlossaryRepository : CosmosDbRepository, IGlossaryRepository
    {
        public GlossaryRepository(CosmosClient cosmosClient, DatabaseSettings settings, ILogger<GlossaryRepository> logger)
            : base(cosmosClient, settings, logger)
        {
        }

        public async Task<IEnumerable<GlossaryTerm>> GetAllTermsAsync()
        {
            var queryText = "SELECT * FROM c WHERE c.type = 'glossaryTerm'";
            var queryDefinition = new QueryDefinition(queryText);

            return await QueryItemsAsync<GlossaryTerm>(queryText, queryDefinition);
        }

        public async Task<GlossaryTerm?> GetTermByIdAsync(string id)
        {
            return await GetItemAsync<GlossaryTerm>(id, id);
        }

        public async Task<GlossaryTerm> CreateTermAsync(GlossaryTerm term)
        {
            if (string.IsNullOrEmpty(term.Id))
            {
                term.Id = Guid.NewGuid().ToString();
            }

            term.Type = "glossaryTerm";

            return await CreateItemAsync(term, term.Id);
        }

        public async Task<GlossaryTerm> UpdateTermAsync(GlossaryTerm term)
        {
            term.Type = "glossaryTerm";
            return await UpdateItemAsync(term.Id, term, term.Id);
        }

        public async Task<bool> DeleteTermAsync(string id)
        {
            return await DeleteItemAsync(id, id);
        }
    }
}
