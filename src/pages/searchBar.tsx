
import './searchBar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Stock {
  symbol: string;
  name: string;
}


export const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearchInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const wordCount = query.length;
   

    if (wordCount >= 2) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/search/${query}`);
        const data = await response.json();
        if (response.ok) {
          const results = data.bestMatches.map((match: any) => ({
            symbol: match['1. symbol'],
            name: match['2. name']
          }));
          setSearchResults(results);
        } else {
          setError('Failed to fetch search results');
        }
      } catch (err) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }

    

  };

  const handleClick = (symbol: string) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/symbol/${symbol}`);
  };


  return (
    <div className="search-auth">
      <input
        type="text"
        placeholder="Search (minimum 2 words)..."
        className="search-box"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} onClick={() => handleClick(result.symbol)}>
                <strong>{result.symbol} </strong> {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;