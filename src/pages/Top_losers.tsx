// import React attributes for managing side effects and state
import  { useEffect, useState } from 'react';
// import useNavigate attribute for programmatic navigation
import { useNavigate } from 'react-router-dom';

// define TypeScript interface for Loser data
interface Loser {
  change: number;
  changesPercentage: number;
  price: number;
  symbol: string;
  name: string;
  }

// define the Top_losers component as a functional React component
export const Top_losers = () =>{
  const [losers, setLosers] = useState<Loser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // effect component to fetch top losers when the component mounts
  useEffect(() => {
    fetchTopLosers();
  }, []);

  // function to fetch top losers from the server
  const fetchTopLosers = async () => {
    try {
      const response = await fetch('/top-losers'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        
        setLosers(data);
        setLoading(false); 
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (error) {
      setError('Error fetching top Losers');
      
      setLoading(false); 
    }

    
  };

  // function to handle click event on a loser item and navigate to detailed view
  const handleInputChange = (symbol: string) => {
      
    navigate(`/symbol/${symbol}`);
  };

  return (

<div className="top-losers">
<h1 className="cp">TOP LOSERS</h1>
<hr/><hr/>

    
        {losers.length > 0 ? (losers.map((loser) => (
            
            
            <div className="wrapper" key={loser.symbol} onClick={() => handleInputChange(loser.symbol)}> 
            
                <div className="h3" > {loser.symbol}</div>
                <div className="h5"> {loser.price} </div>
            
              <div className="h4">  {loser.name} </div>
                <div className={"negative h6"}> {loser.change}({loser.changesPercentage}%) </div>
                <hr/><hr/>
                </div>
               
        ))) : (
          <p>Loading...</p>
        )}

</div>

  );
 };
// export the Top_losers component as default export 
export default Top_losers;