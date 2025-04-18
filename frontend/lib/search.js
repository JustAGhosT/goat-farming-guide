import axios from 'axios';

const API_BASE_URL = '/api';

export const processSearchQuery = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/query`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error processing search query:', error);
    throw error;
  }
};

export const provideSearchSuggestions = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/suggest`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error providing search suggestions:', error);
    throw error;
  }
};

const searchCache = new Map();

export const cacheSearchResults = (query, results) => {
  searchCache.set(query, results);
};

export const getCachedSearchResults = (query) => {
  return searchCache.get(query);
};

export const logError = (error, context) => {
  console.error(`Error in ${context}:`, error);
};

export const logInfo = (message, context) => {
  console.log(`Info in ${context}:`, message);
};
