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

// Unit tests for the API endpoint
if (process.env.NODE_ENV === 'test') {
  const { expect } = require('chai');
  const sinon = require('sinon');
  const { mockContext, mockRequest } = require('../../shared/testUtils');

  describe('getRelated API', () => {
    let context;
    let req;

    beforeEach(() => {
      context = mockContext();
      req = mockRequest();
    });

    it('should return 400 if topicSlug is missing', async () => {
      req.query = {};
      await module.exports(context, req);
      expect(context.res.status).to.equal(400);
      expect(context.res.body).to.equal('Topic slug is required.');
    });

    it('should return 404 if no related articles are found', async () => {
      req.query = { topicSlug: 'test-topic' };
      sinon.stub(container.items, 'query').returns({
        fetchAll: () => ({ resources: [] })
      });
      await module.exports(context, req);
      expect(context.res.status).to.equal(404);
      expect(context.res.body).to.equal('No related articles found.');
    });

    it('should return 200 and the related articles if found', async () => {
      const relatedArticles = [{ id: '1', title: 'Test Article' }];
      req.query = { topicSlug: 'test-topic' };
      sinon.stub(container.items, 'query').returns({
        fetchAll: () => ({ resources: relatedArticles })
      });
      await module.exports(context, req);
      expect(context.res.status).to.equal(200);
      expect(context.res.body).to.deep.equal(relatedArticles);
    });

    it('should return 500 if an error occurs', async () => {
      req.query = { topicSlug: 'test-topic' };
      sinon.stub(container.items, 'query').throws(new Error('Test error'));
      await module.exports(context, req);
      expect(context.res.status).to.equal(500);
      expect(context.res.body).to.equal('An error occurred while fetching the related articles.');
    });
  });
}
