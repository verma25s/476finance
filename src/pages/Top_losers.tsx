import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface Loser {
  change: number;
  changesPercentage: number;
  price: number;
  symbol: string;
    
  }

export const Top_losers = () =>{
  const [losers, setLosers] = useState<Loser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const navigate = useNavigate();
  useEffect(() => {
    fetchTopLosers();
  }, []);

  const fetchTopLosers = async () => {
    try {
      const response = await fetch('/top-losers'); // Adjust API endpoint as needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Ensure data.top_Losers is an array and set it to state
      if (Array.isArray(data)) {
        
        setLosers(data);
        setLoading(false); // Set loading to false once data is fetched
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (error) {
      setError('Error fetching top Losers');
      
      setLoading(false); // Set loading to false on error
    }

    
  };
  const handleInputChange = (symbol: string) => {
      
    navigate(`/symbol/${symbol}`);
  };

  return (

<div className="top-losers">
<h1 className="cp">TOP LOSERS</h1>
<hr/><hr/>

    
        {losers.length > 0 ? (losers.map((loser) => (
            
            
            <div className="wrapper" key={loser.symbol}> 
            
                <div className="h3" onClick={() => handleInputChange(loser.symbol)}> {loser.symbol}</div>
                <div className="h5"> {loser.price} </div>
            
              <div className="h4">  {loser.changesPercentage}</div>
                <div className={"positive h6"}> {loser.change}</div>
                <hr/><hr/>
                </div>
               
        ))) : (
          <p>Loading...</p>
        )}

</div>


  );
 };

export default Top_losers;