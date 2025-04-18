using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Cosmos;

namespace GoatFarmingGuide.Api
{
    public static class AddEditBlog
    {
        private static readonly string CosmosConnectionString = Environment.GetEnvironmentVariable("COSMOS_CONNECTION_STRING");
        private static readonly string DatabaseId = Environment.GetEnvironmentVariable("COSMOS_DATABASE_ID");
        private static readonly string ContainerId = Environment.GetEnvironmentVariable("COSMOS_CONTAINER_ID");
        private static readonly CosmosClient Client = new CosmosClient(CosmosConnectionString);
        private static readonly Container Container = Client.GetContainer(DatabaseId, ContainerId);

        public class BlogPost
        {
            [JsonProperty("id")]
            public string Id { get; set; }

            [JsonProperty("title")]
            public string Title { get; set; }

            [JsonProperty("content")]
            public string Content { get; set; }

            [JsonProperty("author")]
            public string Author { get; set; }

            [JsonProperty("createdAt")]
            public string CreatedAt { get; set; }

            [JsonProperty("lastUpdated")]
            public string LastUpdated { get; set; }
        }

        [FunctionName("AddEditBlog")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", "put", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Processing add/edit blog request");

            // Authentication
            string authHeader = req.Headers["Authorization"];
            if (string.IsNullOrEmpty(authHeader) || authHeader != "Bearer hardcoded-token")
            {
                return new UnauthorizedResult();
            }

            // Parse request body
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var blogPost = JsonConvert.DeserializeObject<BlogPost>(requestBody);

            if (string.IsNullOrEmpty(blogPost.Title) || string.IsNullOrEmpty(blogPost.Content) ||
                string.IsNullOrEmpty(blogPost.Author))
            {
                return new BadRequestObjectResult("Title, content, and author are required.");
            }

            try
            {
                if (!string.IsNullOrEmpty(blogPost.Id))
                {
                    // Edit existing blog
                    ItemResponse<BlogPost> response;
                    try
                    {
                        response = await Container.ReadItemAsync<BlogPost>(
                            blogPost.Id,
                            new PartitionKey(blogPost.Id)
                        );
                    }
                    catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
                    {
                        return new NotFoundObjectResult("Blog not found.");
                    }

                    var existingBlog = response.Resource;
                    existingBlog.Title = blogPost.Title;
                    existingBlog.Content = blogPost.Content;
                    existingBlog.Author = blogPost.Author;
                    existingBlog.LastUpdated = DateTime.UtcNow.ToString("o");

                    var updateResponse = await Container.ReplaceItemAsync(
                        existingBlog,
                        existingBlog.Id,
                        new PartitionKey(existingBlog.Id)
                    );

                    return new OkObjectResult(updateResponse.Resource);
                }
                else
                {
                    // Add new blog
                    if (string.IsNullOrEmpty(blogPost.Id))
                    {
                        blogPost.Id = Guid.NewGuid().ToString();
                    }

                    blogPost.CreatedAt = DateTime.UtcNow.ToString("o");
                    blogPost.LastUpdated = DateTime.UtcNow.ToString("o");

                    var createResponse = await Container.CreateItemAsync(
                        blogPost,
                        new PartitionKey(blogPost.Id)
                    );

                    return new CreatedResult("", createResponse.Resource);
                }
            }
            catch (Exception ex)
            {
                log.LogError($"Error adding or editing blog: {ex.Message}");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}