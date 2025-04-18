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

  const { id, title, content, author } = req.body;

  context.log(`Received request with id: ${id}, title: ${title}, content: ${content}, author: ${author}`);

  if (!title || !content || !author) {
    context.res = {
      status: 400,
      body: 'Title, content, and author are required.'
    };
    return;
  }

  try {
    if (id) {
      // Edit existing blog
      const { resource: existingBlog } = await container.item(id).read();
      if (!existingBlog) {
        context.res = {
          status: 404,
          body: 'Blog not found.'
        };
        return;
      }

      existingBlog.title = title;
      existingBlog.content = content;
      existingBlog.author = author;
      existingBlog.lastUpdated = new Date().toISOString();

      await container.item(id).replace(existingBlog);

      context.res = {
        status: 200,
        body: existingBlog
      };
    } else {
      // Add new blog
      const newBlog = {
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      const { resource: createdBlog } = await container.items.create(newBlog);

      context.res = {
        status: 201,
        body: createdBlog
      };
    }
  } catch (error) {
    context.log.error('Error adding or editing blog:', error);
    context.res = {
      status: 500,
      body: 'An error occurred while adding or editing the blog.'
    };
  }
};
