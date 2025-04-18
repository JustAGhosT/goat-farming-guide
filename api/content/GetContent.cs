using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Contentful.Core;
using Contentful.Core.Search;
using GoatFarmingGuide.Api.Shared;

namespace GoatFarmingGuide.Api
{
    public static class GetContent
    {
        private static readonly ContentfulClient Client = new ContentfulClient(
            httpClient: new System.Net.Http.HttpClient(),
            deliveryApiKey: Config.HeadlessCMS.AccessToken,
            spaceId: Config.HeadlessCMS.SpaceId,
            environmentId: Config.HeadlessCMS.Environment
        );

        [FunctionName("GetContent")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "content")] HttpRequest req,
            ILogger log)
        {
            string contentType = req.Query["contentType"];
            string slug = req.Query["slug"];

            log.LogInformation($"Received request with contentType: {contentType}, slug: {slug}");

            if (string.IsNullOrEmpty(contentType) || string.IsNullOrEmpty(slug))
            {
                return new BadRequestObjectResult("Content type and slug are required.");
            }

            try
            {
                var queryBuilder = QueryBuilder<dynamic>.New.ContentTypeIs(contentType)
                    .FieldEquals("fields.slug", slug);

                var entries = await Client.GetEntries(queryBuilder);

                log.LogInformation($"Fetched entries: {JsonConvert.SerializeObject(entries)}");

                if (entries.Total == 0)
                {
                    return new NotFoundObjectResult("Content not found.");
                }

                return new OkObjectResult(entries.Items[0]);
            }
            catch (Exception ex)
            {
                log.LogError($"Error fetching content: {ex.Message}");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}