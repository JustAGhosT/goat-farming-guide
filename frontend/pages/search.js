import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SearchBar from '../components/common/SearchBar';
import ArticleCard from '../components/articles/ArticleCard';

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios.get(`/api/search?query=${query}`)
        .then(response => {
          setSearchResults(response.data.results);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar initialQuery={query} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map(result => (
            <ArticleCard key={result.id} article={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
