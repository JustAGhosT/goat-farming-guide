using Newtonsoft.Json;

namespace GoatFarmingGuide.Database.Models
{
    public class GlossaryTerm
    {
        [JsonProperty("id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("type")]
        public string Type { get; set; } = string.Empty;

        [JsonProperty("term")]
        public string Term { get; set; } = string.Empty;

        [JsonProperty("definition")]
        public string Definition { get; set; } = string.Empty;
    }
}
