import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface Watchlist {
    change: number;
    changesPercentage: number;
    price: number;
    symbol: string;
    name: string;
}

export const Trending = () => {
  const [trending_stocks, settrending_stocks] = useState<Watchlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchToptrending_stocks();
  }, []);

  const fetchToptrending_stocks = async () => {
    try {
      const response = await fetch('/trending'); // Adjust API endpoint as needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Ensure data.top_trending_stocks is an array and set it to state
      if (Array.isArray(data)) {
        settrending_stocks(data);
        setLoading(false); // Set loading to false once data is fetched
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (error) {
      setError('Error fetching top trending_stocks');
      console.error('Error fetching top trending_stocks:', error);
      setLoading(false); // Set loading to false on error
    }
  };
  const handleInputChange = (symbol: string) => {
      
    navigate(`/symbol/${symbol}`);
  };
  return (
    <div className="top-trending">
      <h1 className="cp">Trending</h1>
      <hr />
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        trending_stocks.length > 0 &&
        trending_stocks.map((watchlist) => (
          <div className="wrapper" key={watchlist.symbol} onClick={() => handleInputChange(watchlist.symbol)}>
            <div className="h3">{watchlist.symbol}</div>
            <div className="h5">{watchlist.price}</div>
            <div className="h4">{watchlist.name}</div>
            <div className="positive h6">{watchlist.change}({watchlist.changesPercentage}%)</div>
            <hr />
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Trending;
