import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Trending {
  change: number;
  changesPercentage: number;
  price: number;
  symbol: string;
  name: string;
}

export const Trending = () => {
  const [trending_stocks, settrending_stocks] = useState<Trending[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();


  useEffect(() => {
    fetchToptrending_stocks();
  }, []);

  const fetchToptrending_stocks = async () => {
    try {
      const response = await fetch('/trending');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        settrending_stocks(data);
        setLoading(false);
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (error) {
      setError('Error fetching top trending_stocks');
      console.error('Error fetching top trending_stocks:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (symbol: string) => {
    //Navigate to the tickerPage    
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
        trending_stocks.map((trending) => (
          <div className="wrapper" key={trending.symbol} onClick={() => handleInputChange(trending.symbol)}>
            <div className="h3">{trending.symbol}</div>
            <div className="h5">{trending.price}</div>
            <div className="h4">{trending.name}</div>
            <div className="positive h6">{trending.change}({trending.changesPercentage}%)</div>
            <hr />
            <hr />
          </div>
        ))
      )}
    </div>
  );
};
export default Trending;
