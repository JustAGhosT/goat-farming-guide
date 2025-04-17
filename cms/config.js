module.exports = {
  cms: {
    name: 'contentful',
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  },
  site: {
    name: 'Goat Farming Guide',
    url: 'https://goatfarmingguide.com',
    description: 'A comprehensive guide to goat farming, covering topics such as breeding, health management, and more.',
  },
  content: {
    types: {
      article: {
        fields: {
          title: 'Title',
          slug: 'Slug',
          publishDate: 'Publish Date',
          lastUpdated: 'Last Updated',
          excerpt: 'Excerpt',
          readingTime: 'Reading Time',
          difficulty: 'Difficulty',
          featuredImage: 'Featured Image',
          tags: 'Tags',
          relatedArticles: 'Related Articles',
          viewCount: 'View Count',
          hasDownloadable: 'Has Downloadable',
          downloadables: 'Downloadables',
        },
      },
      topic: {
        fields: {
          title: 'Title',
          slug: 'Slug',
          description: 'Description',
          icon: 'Icon',
          order: 'Order',
          articleCount: 'Article Count',
        },
      },
      glossary: {
        fields: {
          term: 'Term',
          definition: 'Definition',
          relatedTerms: 'Related Terms',
          relatedArticles: 'Related Articles',
        },
      },
    },
  },
};
