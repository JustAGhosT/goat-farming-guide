import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SearchBar from '../components/common/SearchBar';
import ArticleCard from '../components/articles/ArticleCard';
import { debounce } from 'lodash';

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('relevance');
  const [filters, setFilters] = useState({ category: '', dateRange: '', author: '' });
  const [suggestions, setSuggestions] = useState([]);
  const [didYouMean, setDidYouMean] = useState('');

  const fetchSearchResults = useCallback(
    debounce(async (query, page, sortOption, filters) => {
      setLoading(true);
      try {
        const response = await axios.get('/api/search/query', {
          params: { query, page, sortOption, ...filters },
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
    debounce(async (query) => {
      try {
        const response = await axios.get('/api/search/suggest', {
          params: { query },
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

  const handleSearch = (query) => {
    router.push(`/search?query=${query}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar initialQuery={query} onSearch={handleSearch} onSuggestionsFetch={fetchSearchSuggestions} suggestions={suggestions} />
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
