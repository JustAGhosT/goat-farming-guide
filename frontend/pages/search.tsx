import axios from 'axios';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ArticleCard from '../components/articles/ArticleCard';
import SearchBar from '../components/common/SearchBar';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  score: number;
}

interface SearchResponse {
  results: SearchResult[];
  totalPages: number;
  didYouMean?: string;
}

interface FilterOptions {
  category: string;
  dateRange: string;
  author: string;
}

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { query } = router.query as { query?: string };
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>('relevance');
  const [filters, setFilters] = useState<FilterOptions>({ category: '', dateRange: '', author: '' });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [didYouMean, setDidYouMean] = useState<string>('');

  const fetchSearchResults = useCallback(
    debounce(async (searchQuery: string, currentPage: number, sort: string, filterOptions: FilterOptions) => {
      setLoading(true);
      try {
        const response = await axios.get<SearchResponse>('/api/search/query', {
          params: { query: searchQuery, page: currentPage, sortOption: sort, ...filterOptions },
        });
        setSearchResults(response.data.results);
        setTotalPages(response.data.totalPages);
        setDidYouMean(response.data.didYouMean || '');
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const fetchSearchSuggestions = useCallback(
    debounce(async (searchQuery: string) => {
      try {
        const response = await axios.get<string[]>('/api/search/suggest', {
          params: { query: searchQuery },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query) {
      fetchSearchResults(query, page, sortOption, filters);
    }
  }, [query, page, sortOption, filters, fetchSearchResults]);

  const handleSearch = (searchQuery: string) => {
    router.push(`/search?query=${searchQuery}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar 
        initialQuery={query || ''} 
        onSuggestionsFetch={fetchSearchSuggestions} 
        suggestions={suggestions} 
      />
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange} className="border border-gray-300 rounded px-2 py-1">
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="mr-2">Category:</label>
          <input type="text" id="category" name="category" value={filters.category} onChange={handleFilterChange} className="border border-gray-300 rounded px-2 py-1" />
          <label htmlFor="dateRange" className="mr-2 ml-4">Date Range:</label>
          <input type="text" id="dateRange" name="dateRange" value={filters.dateRange} onChange={handleFilterChange} className="border border-gray-300 rounded px-2 py-1" />
          <label htmlFor="author" className="mr-2 ml-4">Author:</label>
          <input type="text" id="author" name="author" value={filters.author} onChange={handleFilterChange} className="border border-gray-300 rounded px-2 py-1" />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {didYouMean && <p>Did you mean: <span className="text-blue-600 cursor-pointer" onClick={() => handleSearch(didYouMean)}>{didYouMean}</span>?</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(result => (
              <ArticleCard key={result.id} article={result} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 mx-1 ${pageNumber === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;