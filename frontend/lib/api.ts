import config from './config';

// Interfaces
export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  topicSlug: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  score: number;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
}

// Fetch search results from API
export async function fetchSearchResults(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(`${config.apiBaseUrl}/search/query?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Search failed with status: ${response.status}`);
    }
    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
}

// Fetch search suggestions from API
export async function fetchSearchSuggestions(query: string): Promise<string[]> {
  try {
    const response = await fetch(`${config.apiBaseUrl}/search/suggest?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Suggestions failed with status: ${response.status}`);
    }
    const suggestions = await response.json();
    return suggestions;
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    throw error;
  }
}

// Fetch all topics
export async function fetchTopics(): Promise<Topic[]> {
  try {
    const response = await fetch(`${config.apiBaseUrl}/topics`);
    if (!response.ok) {
      throw new Error(`Failed to fetch topics with status: ${response.status}`);
    }
    const topics = await response.json();
    return topics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
}

// Fetch articles by topic
export async function fetchArticlesByTopic(topicSlug: string): Promise<Article[]> {
  try {
    const response = await fetch(`${config.apiBaseUrl}/related?topicSlug=${encodeURIComponent(topicSlug)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch articles with status: ${response.status}`);
    }
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('Error fetching articles by topic:', error);
    throw error;
  }
}

// Fetch a specific article
export async function fetchArticle(topicSlug: string, articleSlug: string): Promise<Article> {
  try {
    const response = await fetch(`${config.apiBaseUrl}/article?topicSlug=${encodeURIComponent(topicSlug)}&articleSlug=${encodeURIComponent(articleSlug)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch article with status: ${response.status}`);
    }
    const article = await response.json();
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
}

// Fetch glossary terms
export async function fetchGlossaryTerms(): Promise<any[]> {
  try {
    const response = await fetch(`${config.apiBaseUrl}/glossary`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch glossary with status: ${response.status}`);
    }
    
    const glossaryTerms = await response.json();
    return glossaryTerms;
  } catch (error) {
    console.error('Error fetching glossary terms:', error);
    throw error;
  }
}

// Add a new blog post or edit an existing one
export async function addEditBlog(blogPost: any, token: string): Promise<any> {
  try {
    const method = blogPost.id ? 'PUT' : 'POST';
    const response = await fetch(`${config.apiBaseUrl}/blog`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(blogPost)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to ${blogPost.id ? 'update' : 'create'} blog post with status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error ${blogPost.id ? 'updating' : 'creating'} blog post:`, error);
    throw error;
  }
}