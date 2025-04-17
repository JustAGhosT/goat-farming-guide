const { CosmosClient } = require('@azure/cosmos');
const config = require('./config');

const client = new CosmosClient(config.cosmos);
const database = client.database(config.databaseId);
const container = database.container(config.containerId);

async function connectToDatabase() {
  try {
    await client.databases.createIfNotExists({ id: config.databaseId });
    await database.containers.createIfNotExists({ id: config.containerId });
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

module.exports = {
  connectToDatabase,
  client,
  database,
  container
};
