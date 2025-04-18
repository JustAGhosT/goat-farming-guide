using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Cosmos;
using GoatFarmingGuide.Api.Shared;

namespace GoatFarmingGuide.Api
{
    public static class GetGlossary
    {
        public class GlossaryTerm
        {
            [JsonProperty("id")]
            public string Id { get; set; }

            [JsonProperty("type")]
            public string Type { get; set; }

            [JsonProperty("term")]
            public string Term { get; set; }

            [JsonProperty("definition")]
            public string Definition { get; set; }
        }

        [FunctionName("GetGlossary")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "glossary")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Received request for glossary terms");

            try
            {
                QueryDefinition queryDefinition = new QueryDefinition(
                    "SELECT * FROM c WHERE c.type = 'glossaryTerm'");

                log.LogInformation($"Executing query: {queryDefinition.QueryText}");

                FeedIterator<GlossaryTerm> queryResultSetIterator = DbContext.Container.GetItemQueryIterator<GlossaryTerm>(queryDefinition);
                List<GlossaryTerm> glossaryTerms = new List<GlossaryTerm>();

                while (queryResultSetIterator.HasMoreResults)
                {
                    FeedResponse<GlossaryTerm> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                    foreach (GlossaryTerm term in currentResultSet)
                    {
                        glossaryTerms.Add(term);
                    }
                }

                log.LogInformation($"Fetched glossary terms: {JsonConvert.SerializeObject(glossaryTerms)}");

                if (glossaryTerms.Count == 0)
                {
                    return new NotFoundObjectResult("No glossary terms found.");
                }

                return new OkObjectResult(glossaryTerms);
            }
            catch (Exception ex)
            {
                log.LogError($"Error fetching glossary terms: {ex.Message}");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}