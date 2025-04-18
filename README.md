# Goat Farming Guide

A comprehensive resource designed to assist farmers, homesteaders, and agricultural entrepreneurs in successfully managing goat farming operations.

## Project Structure

This project is organized into two main components:

- `/api` - Backend API built with C# Azure Functions
- `/frontend` - Frontend web application built with Next.js

## Features

- **Health Monitoring & Maintenance**: Daily and long-term care strategies.
- **Milk Quality & Storage**: Best practices for safe and efficient milk handling.
- **Production Records**: Structured tracking for better farm management.
- **Nutrition Management**: Feeding schedules and essential dietary guidelines.
- **Investor Information**: Business insights for profitable goat farming.
- **DIY Milking Stand Plans**: Step-by-step guide to building a cost-effective milking stand.
- **Search Functionality**: Efficient search for articles and resources.
- **Glossary**: Comprehensive glossary of farming terms.

## API (C# Azure Functions)

The API provides endpoints for retrieving content, searching, and managing blog posts. It's built using C# Azure Functions and connects to Azure Cosmos DB for data storage.

See the [API README](/api/README.md) for more details.

## Frontend (Next.js)

The frontend is a responsive web application built with Next.js and React. It provides a user-friendly interface for accessing the goat farming guide content.

See the [Frontend README](/frontend/README.md) for more details.

## Getting Started

### Prerequisites

- [.NET 6.0 SDK](https://dotnet.microsoft.com/download/dotnet/6.0) for the API
- [Node.js](https://nodejs.org/) (v14 or later) for the frontend
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools) for local API development

### Running the API

1. Navigate to the `/api` directory
2. Configure the `local.settings.json` file with your connection strings and API keys
3. Run `func start` to start the API locally

### Running the Frontend

1. Navigate to the `/frontend` directory
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open your browser to [http://localhost:3000](http://localhost:3000)

## Deployment

### API Deployment

The API can be deployed to Azure Functions using the Azure CLI, Visual Studio, or the Azure Portal.

```bash
cd api
func azure functionapp publish <your-function-app-name>
```

### Frontend Deployment

The frontend can be deployed to Vercel, Netlify, or any other static site hosting service.

```bash
cd frontend
npm run build
# Deploy the .next directory according to your hosting provider's instructions
```

## Authentication

The API includes basic authentication for certain endpoints. Currently, a hardcoded token is used for demonstration purposes.

## Headless CMS Integration

The project includes integration with a headless CMS (Contentful) for managing content. The API includes endpoints for retrieving content from the CMS.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact Information

For more details, feel free to reach out:

📧 Email: [smit.jurie@gmail.com](mailto:smit.jurie@gmail.com)