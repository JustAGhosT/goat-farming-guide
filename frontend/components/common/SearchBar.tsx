import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { provideSearchSuggestions } from '../../utils/apiUtils';

interface SearchBarProps {
  initialQuery?: string;
  onSuggestionsFetch?: (_suggestions: string[]) => void;
  suggestions?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  initialQuery = '', 
  onSuggestionsFetch: _onSuggestionsFetch, 
  suggestions: _suggestions 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query}`);
    }
  };

  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.trim()) {
        const suggestions = await provideSearchSuggestions(query);
        setSearchSuggestions(suggestions);
        if (_onSuggestionsFetch) {
          _onSuggestionsFetch(suggestions);
        }
      }
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    fetchSuggestions(newQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center relative">
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
        <ul className="absolute bg-white border border-gray-300 rounded mt-1 w-full z-10">
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
