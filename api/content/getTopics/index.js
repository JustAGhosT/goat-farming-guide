const { CosmosClient } = require('@azure/cosmos');
const config = require('../../shared/config');

const client = new CosmosClient(config.cosmos);
const database = client.database(config.databaseId);
const container = database.container(config.containerId);

module.exports = async function (context, req) {
    try {
        const query = 'SELECT * FROM c WHERE c.type = "topic"';
        context.log('Executing query:', query);

        const { resources: topics } = await container.items
            .query(query)
            .fetchAll();

        context.log('Fetched topics:', topics);

        context.res = {
            status: 200,
            body: topics
        };
    } catch (error) {
        context.log.error('Error fetching topics:', error);
        context.res = {
            status: 500,
            body: 'Error fetching topics'
        };
    }
};
