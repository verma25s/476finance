// import necessary React component
import React, { useState } from 'react';
// import useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom';

// define the Stock interface for TypeScript
interface Stock {
  symbol: string;
  description: string;
}

// define the SearchBar component
export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // handler function for search input changes
  const handleSearchInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const wordCount = query.length;
   

    if (wordCount >= 2) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/search/${query}`);
        const data = await response.json();
        if (response.ok) {
          setSearchResults(data.result);
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

  // handler function for when a search result is clicked
  const handleClick = (symbol: string) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/symbol/${symbol}`);
  };

  // handler function to cancel the search
  const handleCancel = () => {
    setSearchQuery('');
    setSearchResults([]);
 
  };

  return (
    <div >
      <input
        type="text"
        placeholder="Search (Minimum 2 words)..."
        className="search-box"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
     {searchResults.length > 0 && (<div className="cancel-search-button"><button onClick={() => handleCancel()}>Cancel</button></div>)}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} onClick={() => handleClick(result.symbol)}>
                <strong>{result.symbol} </strong> {result.description}
              </li>
            ))}
          </ul>
          
        </div>
      )}

    </div>
  );
};
// export the SearchBar component as default
export default SearchBar;