const { CosmosClient } = require('@azure/cosmos');
const config = require('../../shared/config');

const client = new CosmosClient(config.cosmos);
const database = client.database(config.databaseId);
const container = database.container(config.containerId);

module.exports = async function (context, req) {
  const { topicSlug, articleSlug } = req.query;

  if (!topicSlug || !articleSlug) {
    context.res = {
      status: 400,
      body: 'Topic slug and article slug are required.'
    };
    return;
  }

  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.topicSlug = @topicSlug AND c.slug = @articleSlug',
      parameters: [
        { name: '@topicSlug', value: topicSlug },
        { name: '@articleSlug', value: articleSlug }
      ]
    };

    const { resources: articles } = await container.items.query(querySpec).fetchAll();

    if (articles.length === 0) {
      context.res = {
        status: 404,
        body: 'Article not found.'
      };
      return;
    }

    context.res = {
      status: 200,
      body: articles[0]
    };
  } catch (error) {
    context.log.error('Error fetching article details:', error);
    context.res = {
      status: 500,
      body: 'An error occurred while fetching the article details.'
    };
  }
};
