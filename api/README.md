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