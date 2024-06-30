import React, { useEffect, useState } from 'react';
import { RxWidth } from 'react-icons/rx';

interface Gainer {
    change_amount: number;
    change_percentage: number;
    price: number;
    ticker: string;
    volume: number;
  }
export const Top_gainers = () =>{
    const [gainers, setGainers] = useState<Gainer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopGainers();
  }, []);

  const fetchTopGainers = async () => {
    try {
      const response = await fetch('/top-gainers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Debugging log
      console.log('Fetched data:', data);
      console.log('Type of fetched data:', typeof data.top_gainers);
      console.log('Is array:', Array.isArray(data.top_gainers));

      // Ensure data is an array
      if (Array.isArray(data.top_gainers)) {
        setGainers(data.top_gainers);
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (error) {
      setError('Error fetching top gainers');
      console.error('Error fetching top gainers:', error);
    }
  };

  return (
   
      
    

<div className="top-gainers">
      
   

    
        {gainers.map((gainer) => (
            
            
            <div className="wrapper" key={gainer.ticker}> 
            
                <div className="h3"> {gainer.ticker}</div>
                <div className="h5"> {gainer.price} </div>
            
              <div className="h4">  {gainer.change_percentage}</div>
                <div className={"positive h6"}> {gainer.change_amount}</div>
            
                </div>
               
        ))}
     
     

</div>


  );
    }