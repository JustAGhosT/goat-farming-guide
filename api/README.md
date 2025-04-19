# Goat Farming Guide API

This directory contains the backend API for the Goat Farming Guide application. The API is built using C# Azure Functions.

## API Structure

- `/content` - Content-related endpoints (articles, topics, glossary)
- `/search` - Search-related endpoints (query, suggest)
- `/shared` - Shared utilities and configurations

## API Endpoints

### Content API

- `GET /api/article?topicSlug={topicSlug}&articleSlug={articleSlug}` - Get an article by topic slug and article slug
- `GET /api/topics` - Get all topics
- `GET /api/related?topicSlug={topicSlug}` - Get related articles by topic slug
- `GET /api/glossary` - Get all glossary terms
- `GET /api/content?contentType={contentType}&slug={slug}` - Get content from Contentful CMS
- `POST /api/blog` - Add a new blog post
- `PUT /api/blog` - Edit an existing blog post

### Search API

- `GET /api/search/query?query={query}` - Search for content
- `GET /api/search/suggest?query={query}` - Get search suggestions

## Authentication

Some endpoints require authentication using a bearer token. The token is currently hardcoded for demonstration purposes.

## Database

The API uses Azure Cosmos DB for data storage. Connection details are configured through environment variables.

## Configuration

Configuration settings are managed through environment variables, which can be set in the `local.settings.json` file for local development.

## Additional Information

### API Structure

The API is organized into several directories:

- `content` - Contains functions related to content management, such as articles, topics, and glossary terms.
- `search` - Contains functions related to search functionality, including search queries and suggestions.
- `shared` - Contains shared utilities and configurations used across the API.

### Endpoints

#### Content API

- `GET /api/article?topicSlug={topicSlug}&articleSlug={articleSlug}` - Retrieves an article based on the provided topic slug and article slug.
- `GET /api/topics` - Retrieves all available topics.
- `GET /api/related?topicSlug={topicSlug}` - Retrieves related articles based on the provided topic slug.
- `GET /api/glossary` - Retrieves all glossary terms.
- `GET /api/content?contentType={contentType}&slug={slug}` - Retrieves content from the Contentful CMS based on the provided content type and slug.
- `POST /api/blog` - Adds a new blog post.
- `PUT /api/blog` - Edits an existing blog post.

#### Search API

- `GET /api/search/query?query={query}` - Performs a search for content based on the provided query.
- `GET /api/search/suggest?query={query}` - Retrieves search suggestions based on the provided query.

### Authentication

Some endpoints require authentication using a bearer token. The token is currently hardcoded for demonstration purposes. In a production environment, a proper authentication mechanism should be implemented.

### Database

The API uses Azure Cosmos DB for data storage. Connection details are configured through environment variables. The `DbContext` class in the `shared` directory handles the connection to the database.

### Configuration

Configuration settings are managed through environment variables, which can be set in the `local.settings.json` file for local development. The `Config` class in the `shared` directory provides access to these configuration settings.

### Services

The API includes several services that handle various aspects of the application:

- `AuthenticationService` - Handles authentication and token validation.
- `ContentProviderFactory` - Provides the appropriate content provider based on the content type.
- `ContentfulContentProvider` - Retrieves content from the Contentful CMS.
- `DatabaseContentProvider` - Retrieves content from the Azure Cosmos DB.
- `SearchService` - Handles search queries and suggestions.

### Dependencies

The API relies on several external libraries and packages, including:

- `Microsoft.NET.Sdk.Functions` - Provides the SDK for building Azure Functions.
- `Microsoft.Azure.Functions.Extensions` - Provides extensions for Azure Functions.
- `Microsoft.Extensions.DependencyInjection` - Provides dependency injection support.
- `contentful.csharp` - Provides a client for interacting with the Contentful CMS.
- `Azure.Search.Documents` - Provides a client for interacting with Azure Cognitive Search.

### Local Development

To run the API locally, follow these steps:

1. Install the Azure Functions Core Tools.
2. Set up the required environment variables in the `local.settings.json` file.
3. Start the Azure Functions runtime using the `func start` command.

### Deployment

The API can be deployed to Azure using the Azure Functions deployment process. Ensure that the required environment variables are set in the Azure Function App settings.

### Example Usage

Here are some example requests to the API endpoints:

- Retrieve an article:
  ```
  GET /api/article?topicSlug=breeding&articleSlug=breeding-basics
  ```

- Retrieve all topics:
  ```
  GET /api/topics
  ```

- Retrieve related articles:
  ```
  GET /api/related?topicSlug=breeding
  ```

- Retrieve all glossary terms:
  ```
  GET /api/glossary
  ```

- Retrieve content from Contentful CMS:
  ```
  GET /api/content?contentType=article&slug=breeding-basics
  ```

- Add a new blog post:
  ```
  POST /api/blog
  {
    "title": "New Blog Post",
    "content": "This is the content of the new blog post.",
    "author": "Author Name"
  }
  ```

- Edit an existing blog post:
  ```
  PUT /api/blog
  {
    "id": "existing-blog-post-id",
    "title": "Updated Blog Post",
    "content": "This is the updated content of the blog post.",
    "author": "Author Name"
  }
  ```

- Perform a search query:
  ```
  GET /api/search/query?query=breeding
  ```

- Retrieve search suggestions:
  ```
  GET /api/search/suggest?query=breed
  ```

For more detailed information on each endpoint and its parameters, refer to the API documentation.
