namespace GoatFarmingGuide.Api
{
    public interface IAuthenticationService
    {
        bool ValidateToken(string token);
    }
}