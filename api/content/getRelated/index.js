const { CosmosClient } = require('@azure/cosmos');
const config = require('../../shared/config');

const client = new CosmosClient(config.cosmos);
const database = client.database(config.databaseId);
const container = database.container(config.containerId);

module.exports = async function (context, req) {
  const { topicSlug } = req.query;

  context.log(`Received request with topicSlug: ${topicSlug}`);

  if (!topicSlug) {
    context.res = {
      status: 400,
      body: 'Topic slug is required.'
    };
    return;
  }

  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.topicSlug = @topicSlug',
      parameters: [
        { name: '@topicSlug', value: topicSlug }
      ]
    };

    context.log('Executing query with querySpec:', querySpec);

    const { resources: relatedArticles } = await container.items.query(querySpec).fetchAll();

    context.log('Fetched related articles:', relatedArticles);

    if (relatedArticles.length === 0) {
      context.res = {
        status: 404,
        body: 'No related articles found.'
      };
      return;
    }

    context.res = {
      status: 200,
      body: relatedArticles
    };
  } catch (error) {
    context.log.error('Error fetching related articles:', error);
    context.res = {
      status: 500,
      body: 'An error occurred while fetching the related articles.'
    };
  }
};
