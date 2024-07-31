// importing useEffect and useState from React
import { useEffect, useState } from 'react';
// importing useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom';

// defining the Gainer interface with necessary properties
interface Gainer {
  
  stockExchange: string;
  currency: string;
  symbol: string;
  name: string;
}

// defining the crypto component
export const Crypto = () => {
  const [gainers, setGainers] = useState<Gainer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // useEffect to fetch the top gainers when the component mounts
  useEffect(() => {
    fetchTopGainers();
  }, []);

// function to fetch top gainers direct from server
  const fetchTopGainers = async () => {
    try {
      // a GET request to fetch the top gainers
      const response = await fetch('/getcryptolist'); // Adjust API endpoint as needed
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

  // function that handles input changes and navigates to get a deep picture of selected cryptocurrency
  const handleInputChange = (symbol: string) => {
      
    navigate(`/symbol/${symbol}`);
  };

  return (
    <div className="top-gainers">
      <h1 className="cp">Cryptocurrencies</h1>
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
            <div className="h5">{gainer.currency}</div>
            <div className="h4">{gainer.name}</div>
            <div className="positive h6">{gainer.stockExchange}</div>
            <hr />
            <hr />
          </div>
        ))
      )}
    </div>
  );
};
// exporting the Crypto component as the default export
export default Crypto;
