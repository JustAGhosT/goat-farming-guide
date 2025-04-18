import axios from 'axios';

const API_BASE_URL = '/api';

// Define interfaces for search results and suggestions
interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  score: number;
}

interface SearchSuggestion {
  text: string;
  queryPlusText: string;
}

export const processSearchQuery = async (query: string): Promise<SearchResult[]> => {
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

export const provideSearchSuggestions = async (query: string): Promise<string[]> => {
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

const searchCache = new Map<string, SearchResult[]>();

export const cacheSearchResults = (query: string, results: SearchResult[]): void => {
  searchCache.set(query, results);
};

export const getCachedSearchResults = (query: string): SearchResult[] | undefined => {
  return searchCache.get(query);
};

export const logError = (error: any, context: string): void => {
  console.error(`Error in ${context}:`, error);
};

export const logInfo = (message: any, context: string): void => {
  console.log(`Info in ${context}:`, message);
};