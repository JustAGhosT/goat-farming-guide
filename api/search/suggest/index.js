const { CognitiveSearchClient, SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const endpoint = process.env.AZURE_COGNITIVE_SEARCH_ENDPOINT;
const apiKey = process.env.AZURE_COGNITIVE_SEARCH_API_KEY;
const indexName = process.env.AZURE_COGNITIVE_SEARCH_INDEX_NAME;

const searchClient = new CognitiveSearchClient(endpoint, new AzureKeyCredential(apiKey));
const indexClient = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));

module.exports = async function (context, req) {
    const query = req.query.query || (req.body && req.body.query);

    if (!query) {
        context.res = {
            status: 400,
            body: "Please provide a search query."
        };
        return;
    }

    try {
        const suggestions = await searchClient.suggest(indexName, {
            search: query,
            suggesterName: "sg",
            top: 5
        });

        const results = [];
        for await (const suggestion of suggestions.results) {
            results.push(suggestion);
        }

        context.res = {
            status: 200,
            body: results
        };
    } catch (error) {
        context.log.error("Error fetching search suggestions:", error);
        context.res = {
            status: 500,
            body: "Error fetching search suggestions."
        };
    }
};
