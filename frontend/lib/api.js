import axios from 'axios';

const API_BASE_URL = '/api';

export const fetchTopics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/getTopics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

export const fetchArticleDetails = async (topicSlug, articleSlug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/getArticle`, {
      params: { topicSlug, articleSlug },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching article details:', error);
    throw error;
  }
};

export const fetchRelatedArticles = async (topicSlug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/getRelated`, {
      params: { topicSlug },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching related articles:', error);
    throw error;
  }
};

export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/query`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

export const fetchSearchSuggestions = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/suggest`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    throw error;
  }
};
