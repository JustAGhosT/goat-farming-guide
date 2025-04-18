using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace GoatFarmingGuide.Api
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ILogger<AuthenticationService> _logger;
        private readonly string _hardcodedToken;

        public AuthenticationService(IConfiguration configuration, ILogger<AuthenticationService> logger)
        {
            _logger = logger;
            // In a production environment, this should be replaced with a proper authentication mechanism
            _hardcodedToken = configuration["AUTH_TOKEN"] ?? "hardcoded-token";
        }

        public bool ValidateToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                _logger.LogWarning("Authentication failed: Token is null or empty");
                return false;
            }

            bool isValid = token == _hardcodedToken;

            if (!isValid)
            {
                _logger.LogWarning("Authentication failed: Invalid token");
            }

            return isValid;
        }
    }
}