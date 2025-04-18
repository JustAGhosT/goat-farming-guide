const { createClient } = require('contentful');
const config = require('../../shared/config');

const client = createClient({
  space: config.headlessCMS.spaceId,
  accessToken: config.headlessCMS.accessToken,
  environment: config.headlessCMS.environment,
});

module.exports = async function (context, req) {
  const { contentType, slug } = req.query;

  context.log(`Received request with contentType: ${contentType}, slug: ${slug}`);

  if (!contentType || !slug) {
    context.res = {
      status: 400,
      body: 'Content type and slug are required.',
    };
    return;
  }

  try {
    const entries = await client.getEntries({
      content_type: contentType,
      'fields.slug': slug,
    });

    context.log('Fetched entries:', entries);

    if (entries.items.length === 0) {
      context.res = {
        status: 404,
        body: 'Content not found.',
      };
      return;
    }

    context.res = {
      status: 200,
      body: entries.items[0],
    };
  } catch (error) {
    context.log.error('Error fetching content:', error);
    context.res = {
      status: 500,
      body: 'An error occurred while fetching the content.',
    };
  }
};
