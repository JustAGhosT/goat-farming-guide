import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import { provideSearchSuggestions } from '../../lib/search';

const SearchBar = ({ initialQuery = '', onSuggestionsFetch, suggestions }) => {
  const [query, setQuery] = useState(initialQuery);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query}`);
    }
  };

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        const suggestions = await provideSearchSuggestions(query);
        setSearchSuggestions(suggestions);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    fetchSuggestions(newQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search articles..."
        className="border border-gray-300 rounded-l px-4 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white rounded-r px-4 py-2"
      >
        Search
      </button>
      {searchSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded mt-1 w-full">
          {searchSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => setQuery(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
