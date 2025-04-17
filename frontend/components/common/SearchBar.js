import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="border border-gray-300 rounded-l px-4 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white rounded-r px-4 py-2"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
