const { CosmosClient } = require('@azure/cosmos');
const config = require('../../shared/config');

const client = new CosmosClient(config.cosmos);
const database = client.database(config.databaseId);
const container = database.container(config.containerId);

const authenticateUser = (req) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== 'Bearer hardcoded-token') {
    return false;
  }
  return true;
};

module.exports = async function (context, req) {
  if (!authenticateUser(req)) {
    context.res = {
      status: 401,
      body: 'Unauthorized'
    };
    return;
  }

  const { topicSlug, articleSlug } = req.query;

  context.log(`Received request with topicSlug: ${topicSlug}, articleSlug: ${articleSlug}`);

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

    context.log('Executing query with querySpec:', querySpec);

    const { resources: articles } = await container.items.query(querySpec).fetchAll();

    context.log('Fetched articles:', articles);

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

// Unit tests for the API endpoint
if (process.env.NODE_ENV === 'test') {
  const { expect } = require('chai');
  const sinon = require('sinon');
  const { mockContext, mockRequest } = require('../../shared/testUtils');

  describe('getArticle API', () => {
    let context;
    let req;

    beforeEach(() => {
      context = mockContext();
      req = mockRequest();
    });

    it('should return 400 if topicSlug or articleSlug is missing', async () => {
      req.query = {};
      await module.exports(context, req);
      expect(context.res.status).to.equal(400);
      expect(context.res.body).to.equal('Topic slug and article slug are required.');
    });

    it('should return 404 if article is not found', async () => {
      req.query = { topicSlug: 'test-topic', articleSlug: 'test-article' };
      sinon.stub(container.items, 'query').returns({
        fetchAll: () => ({ resources: [] })
      });
      await module.exports(context, req);
      expect(context.res.status).to.equal(404);
      expect(context.res.body).to.equal('Article not found.');
    });

    it('should return 200 and the article if found', async () => {
      const article = { id: '1', title: 'Test Article' };
      req.query = { topicSlug: 'test-topic', articleSlug: 'test-article' };
      sinon.stub(container.items, 'query').returns({
        fetchAll: () => ({ resources: [article] })
      });
      await module.exports(context, req);
      expect(context.res.status).to.equal(200);
      expect(context.res.body).to.deep.equal(article);
    });

    it('should return 500 if an error occurs', async () => {
      req.query = { topicSlug: 'test-topic', articleSlug: 'test-article' };
      sinon.stub(container.items, 'query').throws(new Error('Test error'));
      await module.exports(context, req);
      expect(context.res.status).to.equal(500);
      expect(context.res.body).to.equal('An error occurred while fetching the article details.');
    });

    it('should return 401 if the user is not authenticated', async () => {
      req.headers = {};
      await module.exports(context, req);
      expect(context.res.status).to.equal(401);
      expect(context.res.body).to.equal('Unauthorized');
    });

    it('should return 200 if the user is authenticated', async () => {
      const article = { id: '1', title: 'Test Article' };
      req.query = { topicSlug: 'test-topic', articleSlug: 'test-article' };
      req.headers = { authorization: 'Bearer hardcoded-token' };
      sinon.stub(container.items, 'query').returns({
        fetchAll: () => ({ resources: [article] })
      });
      await module.exports(context, req);
      expect(context.res.status).to.equal(200);
      expect(context.res.body).to.deep.equal(article);
    });
  });
}
