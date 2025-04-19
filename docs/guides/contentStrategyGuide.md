# Content Strategy Guide for Goat Farming Guide

## Overview

The Goat Farming Guide application uses a hybrid content management approach:

1. **Database (Azure Cosmos DB)**: For dynamic, user-generated content and application data
2. **Headless CMS (Contentful)**: For marketing content, educational materials, and structured content managed by editors

This guide explains what content belongs where and how to manage it effectively.

## Content Types and Their Sources

| Content Type | Recommended Source | Rationale |
|-------------|-------------------|-----------|
| Articles | Contentful | Structured content that benefits from editorial workflows |
| Topics | Contentful | Taxonomical content with relationships to articles |
| Glossary Terms | Contentful | Reference content that requires editorial review |
| Blog Posts | Database | User-generated content with frequent updates |
| User Comments | Database | Dynamic user-generated content |
| User Profiles | Database | Personal user information |
| Farm Management Data | Database | Private, user-specific operational data |

## When to Use Contentful

Use Contentful for content that:

- Requires editorial workflows (drafts, review, publish)
- Benefits from content modeling and structured fields
- Has relationships with other content types
- Needs versioning and content history
- Is primarily maintained by content creators rather than developers
- Requires localization capabilities
- Is part of the core educational offering

**Examples**: Educational articles, topic hierarchies, glossary terms, breed information, farming guides

## When to Use the Database

Use the database for content that:

- Is user-generated
- Changes frequently
- Requires complex permissions
- Is highly personalized
- Needs high-performance access patterns
- Contains sensitive information
- Is operational rather than educational

**Examples**: User blog posts, comments, farm records, milking schedules, breeding records

## Configuration

The application is designed to be configurable, allowing you to choose the content source for each content type. This is controlled through environment variables:

```
DEFAULT_CONTENT_SOURCE=Database
ARTICLE_CONTENT_SOURCE=Contentful
TOPIC_CONTENT_SOURCE=Contentful
GLOSSARY_CONTENT_SOURCE=Contentful
BLOG_CONTENT_SOURCE=Database
```

### Changing Content Sources

To change where a specific content type is stored:

1. Update the corresponding environment variable
2. Migrate the existing content (if needed)
3. Restart the application

No code changes are required to switch content sources.

## Content Workflow

### For Contentful Content

1. **Create/Edit**: Content editors create or edit content in Contentful
2. **Review**: Content goes through editorial review
3. **Publish**: Content is published in Contentful
4. **Access**: The application fetches the content via the Contentful API

### For Database Content

1. **Create/Edit**: Users create or edit content through the application
2. **Validation**: The application validates the content
3. **Storage**: Content is stored in the database
4. **Access**: The application fetches the content directly from the database

## Content Models

### Contentful Content Models

#### Article
- Title (Short Text)
- Slug (Short Text)
- Content (Rich Text)
- Topic Reference (Reference to Topic)
- Featured Image (Media)
- Tags (Short Text, Multiple)
- SEO Description (Short Text)

#### Topic
- Title (Short Text)
- Slug (Short Text)
- Description (Short Text)
- Icon (Media)
- Order (Number)

#### Glossary Term
- Term (Short Text)
- Definition (Rich Text)
- Related Terms (References)

### Database Models

#### Blog Post
- Id (string)
- Title (string)
- Content (string)
- AuthorId (string)
- CreatedAt (DateTime)
- UpdatedAt (DateTime)
- Tags (string[])
- IsPublished (bool)

#### User Comment
- Id (string)
- Content (string)
- AuthorId (string)
- ArticleId (string)
- CreatedAt (DateTime)
- UpdatedAt (DateTime)

## Best Practices

1. **Content Consistency**: Maintain consistent formatting and style across both systems
2. **Content Migration**: Use the provided tools to migrate content between systems when needed
3. **Media Management**: Store media files in Azure Blob Storage, referenced from both systems
4. **SEO Optimization**: Include metadata in both systems for better search engine visibility
5. **Performance**: Cache frequently accessed content to improve performance
6. **Backup Strategy**: Regularly backup both Contentful content and database content

## Technical Implementation

The application uses a provider pattern to abstract the content source:

- `IContentProvider` interface defines common methods for content retrieval
- `DatabaseContentProvider` implements database access
- `ContentfulContentProvider` implements Contentful access
- `ContentProviderFactory` selects the appropriate provider based on configuration

This allows for seamless switching between content sources without changing application code.

## Monitoring and Analytics

- Track content performance metrics for both sources
- Monitor API usage for Contentful to stay within rate limits
- Analyze user engagement with different content types
- Use A/B testing to optimize content presentation

## Troubleshooting

### Common Issues with Contentful

- **Rate Limiting**: If you hit API rate limits, implement caching strategies
- **Content Modeling Changes**: When changing content models, update the corresponding code
- **Webhook Failures**: Check webhook configurations if content updates aren't reflecting

### Common Issues with Database Content

- **Performance**: If queries are slow, review indexing strategies
- **Consistency**: Ensure validation rules are consistent across all entry points
- **Scaling**: Monitor database performance as content grows

## Conclusion

This hybrid approach gives us the best of both worlds: structured content management for educational materials and dynamic, high-performance storage for user-generated content. By following this guide, we can maintain a consistent content strategy while leveraging the strengths of each platform.

## Frontend Documentation

The frontend documentation for the Goat Farming Guide application is organized into several sections. Each section corresponds to a specific aspect of the application. Below is the list of sections and their respective files:

- [Breed Overview](../breed-overview.md)
- [Feeding Strategies](../feeding-strategies.md)
- [Health and Veterinary](../health-and-veterinary.md)
- [Breeding Practices](../breeding-practices.md)
- [Grazing Management](../grazing-management.md)
- [Production Economics](../production-economics.md)
- [Mistakes & Best Practices](../mistakes-and-best-practices.md)
- [Integration with RegalRoots](../integration-with-regalroots.md)
