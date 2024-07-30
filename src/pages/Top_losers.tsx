import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tickerPage.css';

interface Loser {
  change: number;
  changesPercentage: number;
  price: number;
  symbol: string;
  name: string;
  }

export const Top_losers = () =>{
  const [losers, setLosers] = useState<Loser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchTopLosers();
  }, []);

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

export default Top_losers;