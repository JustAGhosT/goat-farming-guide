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
        const searchResults = await searchClient.search(indexName, {
            search: query,
            top: 10,
            includeTotalResultCount: true
        });

        const results = [];
        for await (const result of searchResults.results) {
            results.push(result);
        }

        context.res = {
            status: 200,
            body: results
        };
    } catch (error) {
        context.log.error("Error fetching search results:", error);
        context.res = {
            status: 500,
            body: "Error fetching search results."
        };
    }
};
