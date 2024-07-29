import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tickerPage.css';


interface Gainer {
  change: number;
  changesPercentage: number;
  price: number;
  symbol: string;
  name: string;
}

export const Top_gainers = () => {
  const [gainers, setGainers] = useState<Gainer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopGainers();
  }, []);

  const fetchTopGainers = async () => {
    try {
      const response = await fetch('/top-gainers'); // Adjust API endpoint as needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Ensure data.top_gainers is an array and set it to state
      if (Array.isArray(data)) {
        setGainers(data);
        setLoading(false); // Set loading to false once data is fetched
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (error) {
      setError('Error fetching top gainers');
      console.error('Error fetching top gainers:', error);
      setLoading(false); // Set loading to false on error
    }
  };

  const handleInputChange = (symbol: string) => {
      
    navigate(`/symbol/${symbol}`);
  };

  return (
    <div className="top-gainers">
      <h1 className="cp">TOP GAINERS</h1>
      <hr />
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        gainers.length > 0 &&
        gainers.map((gainer) => (
          <div className="wrapper" key={gainer.symbol} onClick={() => handleInputChange(gainer.symbol)}>
            <div className="h3" >{gainer.symbol}</div>
            <div className="h5">{gainer.price}</div>
            <div className="h4">{gainer.name}</div>
            <div className="positive h6">{gainer.change}({gainer.changesPercentage}%) </div>
            <hr />
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Top_gainers;
