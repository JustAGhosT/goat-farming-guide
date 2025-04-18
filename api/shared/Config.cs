using System;

namespace GoatFarmingGuide.Api.Shared
{
    public static class Config
    {
        public static string CosmosConnectionString => Environment.GetEnvironmentVariable("COSMOS_CONNECTION_STRING");
        public static string DatabaseId => Environment.GetEnvironmentVariable("COSMOS_DATABASE_ID");
        public static string ContainerId => Environment.GetEnvironmentVariable("COSMOS_CONTAINER_ID");
        public static string SearchApiKey => Environment.GetEnvironmentVariable("SEARCH_API_KEY");
        public static string SearchEndpoint => Environment.GetEnvironmentVariable("SEARCH_ENDPOINT");
        public static string SearchIndexName => Environment.GetEnvironmentVariable("SEARCH_INDEX_NAME");

        public static class HeadlessCMS
        {
            public static string SpaceId => Environment.GetEnvironmentVariable("CONTENTFUL_SPACE_ID");
            public static string AccessToken => Environment.GetEnvironmentVariable("CONTENTFUL_ACCESS_TOKEN");
            public static string Environment => Environment.GetEnvironmentVariable("CONTENTFUL_ENVIRONMENT") ?? "master";
        }
    }
}