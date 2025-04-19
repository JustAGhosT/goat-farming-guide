import axios from 'axios';
import config from './config';

// Fetch search results from API
export async function fetchSearchResults(query: string): Promise<SearchResult[]> {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/search/query`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
}

// Fetch search suggestions from API
export async function fetchSearchSuggestions(query: string): Promise<string[]> {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/search/suggest`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    throw error;
  }
}

// Fetch all topics
export async function fetchTopics(): Promise<Topic[]> {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/topics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
}

// Fetch articles by topic
export async function fetchArticlesByTopic(topicSlug: string): Promise<Article[]> {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/related`, {
      params: { topicSlug },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles by topic:', error);
    throw error;
  }
}

// Fetch a specific article
export async function fetchArticle(topicSlug: string, articleSlug: string): Promise<Article> {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/article`, {
      params: { topicSlug, articleSlug },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
}

// Fetch glossary terms
export async function fetchGlossaryTerms(): Promise<any[]> {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/glossary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching glossary terms:', error);
    throw error;
  }
}

// Add a new blog post or edit an existing one
export async function addEditBlog(blogPost: any, token: string): Promise<any> {
  try {
    const method = blogPost.id ? 'PUT' : 'POST';
    const response = await axios({
      method,
      url: `${config.apiBaseUrl}/blog`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: blogPost,
    });
    return response.data;
  } catch (error) {
    console.error(`Error ${blogPost.id ? 'updating' : 'creating'} blog post:`, error);
    throw error;
  }
}
