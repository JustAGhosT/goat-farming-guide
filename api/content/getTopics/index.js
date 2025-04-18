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

// Unit tests for the API endpoint
if (process.env.NODE_ENV === 'test') {
  const { expect } = require('chai');
  const sinon = require('sinon');
  const { mockContext, mockRequest } = require('../../shared/testUtils');

  describe('getTopics API', () => {
    let context;
    let req;

    beforeEach(() => {
      context = mockContext();
      req = mockRequest();
    });

    it('should return 200 and the list of topics', async () => {
      const topics = [{ id: '1', title: 'Test Topic' }];
      sinon.stub(container.items, 'query').returns({
        fetchAll: () => ({ resources: topics })
      });
      await module.exports(context, req);
      expect(context.res.status).to.equal(200);
      expect(context.res.body).to.deep.equal(topics);
    });

    it('should return 500 if an error occurs', async () => {
      sinon.stub(container.items, 'query').throws(new Error('Test error'));
      await module.exports(context, req);
      expect(context.res.status).to.equal(500);
      expect(context.res.body).to.equal('Error fetching topics');
    });
  });
}
