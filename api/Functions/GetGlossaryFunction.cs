using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using GoatFarmingGuide.Database.Repositories;

namespace GoatFarmingGuide.Api.Functions
{
    public class GetGlossaryFunction
    {
        private readonly IGlossaryRepository _glossaryRepository;
        private readonly ILogger<GetGlossaryFunction> _logger;

        public GetGlossaryFunction(
            IGlossaryRepository glossaryRepository,
            ILogger<GetGlossaryFunction> logger)
        {
            _glossaryRepository = glossaryRepository ?? throw new ArgumentNullException(nameof(glossaryRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [FunctionName("GetGlossary")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "glossary")] HttpRequest req)
        {
            _logger.LogInformation("Processing GetGlossary request");

            try
            {
                var glossaryTerms = await _glossaryRepository.GetAllTermsAsync();
                return new OkObjectResult(glossaryTerms);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching glossary terms");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}