using Newtonsoft.Json;

namespace GoatFarmingGuide.Database.Models
{
    public class BlogPost
    {
        [JsonProperty("id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("title")]
        public string Title { get; set; } = string.Empty;

        [JsonProperty("content")]
        public string Content { get; set; } = string.Empty;

        [JsonProperty("author")]
        public string Author { get; set; } = string.Empty;

        [JsonProperty("createdAt")]
        public string CreatedAt { get; set; } = string.Empty;

        [JsonProperty("lastUpdated")]
        public string LastUpdated { get; set; } = string.Empty;
    }
}