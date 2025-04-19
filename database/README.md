# Goat Farming Guide Database Layer

This project contains the database access layer for the Goat Farming Guide application. It provides a clean abstraction over Azure Cosmos DB and handles all database operations.

## Structure

- `/Config` - Database configuration classes
- `/Models` - Data models representing database entities
- `/Repositories` - Repository classes for data access
- `/Services` - Service classes for business logic

## Features

- Connection management for Azure Cosmos DB
- Repository pattern implementation for data access
- Entity models with proper mapping
- Database initialization and seeding

## Usage

The database layer is designed to be used by the API layer. It provides repositories and services for accessing and manipulating data.

### Example Usage

```csharp
// In API layer
public class ArticleFunction
{
    private readonly IArticleRepository _articleRepository;

    public ArticleFunction(IArticleRepository articleRepository)
    {
        _articleRepository = articleRepository;
    }

    [FunctionName("GetArticle")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "article")] HttpRequest req,
        ILogger log)
    {
        string topicSlug = req.Query["topicSlug"];
        string articleSlug = req.Query["articleSlug"];

        var article = await _articleRepository.GetArticleAsync(topicSlug, articleSlug);
        
        if (article == null)
        {
            return new NotFoundResult();
        }

        return new OkObjectResult(article);
    }
}
```

## Configuration

The database connection is configured through environment variables:

- `COSMOS_CONNECTION_STRING` - Azure Cosmos DB connection string
- `COSMOS_DATABASE_ID` - Database ID
- `COSMOS_CONTAINER_ID` - Container ID

## Dependencies

- Microsoft.Azure.Cosmos - For Azure Cosmos DB access
- Microsoft.Extensions.Configuration - For configuration management
- Microsoft.Extensions.Logging - For logging

## Example Usage

```csharp
// In API layer
public class ArticleFunction
{
    private readonly IArticleRepository _articleRepository;

    public ArticleFunction(IArticleRepository articleRepository)
    {
        _articleRepository = articleRepository;
    }

    [FunctionName("GetArticle")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "article")] HttpRequest req,
        ILogger log)
    {
        string topicSlug = req.Query["topicSlug"];
        string articleSlug = req.Query["articleSlug"];

        var article = await _articleRepository.GetArticleAsync(topicSlug, articleSlug);
        
        if (article == null)
        {
            return new NotFoundResult();
        }

        return new OkObjectResult(article);
    }
}
```
