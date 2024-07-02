import  { useEffect, useState } from 'react';


interface Gainer {
  change_amount: number;
  change_percentage: number;
  price : number;
  ticker: string;
    
  }
export const Top_gainers = () =>{
  const [gainers, setGainers] = useState<Gainer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

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
      if (Array.isArray(data.top_gainers)) {
        setGainers(data.top_gainers);
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

  return (
   
      
    

<div className="top-gainers">
<h1 className="cp">TOP GAINERS</h1>
<hr/><hr/>

    
        {gainers.length > 0 ? (gainers.map((gainer) => (
            
            
            <div className="wrapper" key={gainer.ticker}> 
            
                <div className="h3"> {gainer.ticker}</div>
                <div className="h5"> {gainer.price} </div>
            
              <div className="h4">  {gainer.change_percentage}</div>
                <div className={"positive h6"}> {gainer.change_amount}</div>
                <hr/><hr/>
                </div>
               
        ))) : (
          <p>Loading...</p>
        )}
     
     

</div>


  );
    }