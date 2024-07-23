import React, { useState, useEffect } from "react";
import "./home.css";
import { Top_gainers } from './Top_gainers'
interface StockData {
    longName: string;
    symbol: string;
    currentPrice: number;
    marketCap: number;
    previousClose:number
  }

export const Home = () =>{
  const ft = () => {
       
    setSymbol('TSLA');
  fetchStockData();
};


    const [stockData, setStockData] = useState<StockData | null>(null);
    const [symbol, setSymbol] = useState<string>('AAPL'); // Default symbol
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      // Fetch stock data when component mounts
      fetchStockData();
    }, []); // Empty dependency array to run only once when component mounts
  
    const fetchStockData = async () => {
      try {
        const response = await fetch(`/stock/${symbol}`);
        if (response.ok) {
          const data: StockData = await response.json();
          setStockData(data);
          setError(null); // Clear any previous errors
        } else {
          setError('Failed to fetch stock data');
          console.error('Failed to fetch stock data:', response.statusText);
        }
      } catch (error) {
        setError('Error fetching stock data');
        console.error('Error fetching stock data:', error);
      }
    };
  
    const handleSymbolChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
    };

return (
<div className="container">

<div className="flex-child portfolio">
<h1 className="box-head"> Watchlist</h1>

<Top_gainers/>


</div>
<div className="flex-child gainers">
<h1 className="box-head"> Top Gainers</h1>

    
            {stockData && (

<div className="top-gainers">
      
          <div className="wrapper">
          <div className="h3"> {stockData.symbol}</div>
          
          {stockData.currentPrice && (
              <div className="h5"> {stockData.currentPrice.toFixed(2)}</div>
             
          )}<div className="h4">  {stockData.longName}</div>
          <div className={`h6 ${(stockData.currentPrice - stockData.previousClose) >= 0 ? "positive" : "negative"}`}> { stockData.currentPrice - stockData.previousClose }</div>

          </div>

          <hr></hr>
         
          <div className="wrapper"  onClick={ft}>
      
          <div className="h3"> {stockData.symbol}</div>
          
          {stockData.currentPrice && (
              <div className="h5"> {stockData.currentPrice.toFixed(2)}</div>
             
          )}<div className="h4">  {stockData.longName}</div>
          <div className={`h6 ${(stockData.currentPrice - stockData.previousClose) >= 0 ? "positive" : "negative"}`}> { stockData.currentPrice - stockData.previousClose }</div>

          </div>

          <hr></hr>
</div>
      )}


   

</div>

<div className="flex-child losers">
<h1 className="box-head">Top Losers</h1>
    
</div>

<div className="flex-child news">
<h1 className="box-head"> Latest News</h1>
    
</div>

<div className="flex-child messages">
<h2 className="box-head2"> Messages</h2>
    
</div>



</div>

);
}