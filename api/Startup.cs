using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using GoatFarmingGuide.Database;
using GoatFarmingGuide.Database.Config;
using System;

[assembly: FunctionsStartup(typeof(GoatFarmingGuide.Api.Startup))]

namespace GoatFarmingGuide.Api
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            // Get configuration
            var configuration = builder.GetContext().Configuration;

            // Configure database settings
            var databaseSettings = new DatabaseSettings
            {
                ConnectionString = configuration["COSMOS_CONNECTION_STRING"],
                DatabaseId = configuration["COSMOS_DATABASE_ID"],
                ContainerId = configuration["COSMOS_CONTAINER_ID"]
            };

            // Register database services
            builder.Services.AddDatabaseServices(databaseSettings);

            // Register other services
            builder.Services.AddLogging();

            // Register authentication service
            builder.Services.AddSingleton<IAuthenticationService, AuthenticationService>();

            // Register search services
            builder.Services.AddSingleton<ISearchService, SearchService>();
        }
    }
}