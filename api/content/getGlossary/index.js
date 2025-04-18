const { CosmosClient } = require('@azure/cosmos');
const config = require('../../shared/config');

const client = new CosmosClient(config.cosmos);
const database = client.database(config.databaseId);
const container = database.container(config.containerId);

module.exports = async function (context, req) {
  context.log('Received request for glossary terms');

  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = "glossaryTerm"'
    };

    context.log('Executing query with querySpec:', querySpec);

    const { resources: glossaryTerms } = await container.items.query(querySpec).fetchAll();

    context.log('Fetched glossary terms:', glossaryTerms);

    if (glossaryTerms.length === 0) {
      context.res = {
        status: 404,
        body: 'No glossary terms found.'
      };
      return;
    }

    context.res = {
      status: 200,
      body: glossaryTerms
    };
  } catch (error) {
    context.log.error('Error fetching glossary terms:', error);
    context.res = {
      status: 500,
      body: 'An error occurred while fetching the glossary terms.'
    };
  }
};
