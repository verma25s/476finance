import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './tickerPage.css';

interface NewsItem {
  title: string;
  link: string;
}

interface Officer {
  name: string;
  title: string;
}

interface StockData {
  symbol: string;
  companyName: string;
  exchange: string;
  currentPrice: number;
  priceChange: number;
  volume: number;
  averageVolume: number;
  dayHigh: number;
  dayLow: number;
  marketCap: number;
  "52WeekHigh": number;
  "52WeekLow": number;
  news: NewsItem[];
  officers: Officer[];
  address: string;
  website: string;
}

export const TickerPage = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/stock/${symbol}`);
        if (response.ok) {
          const data: StockData = await response.json();
          setStockData({
            ...data,
            news: data.news || [],
            officers: data.officers || []
          });
        } else {
          setError('Error fetching stock data');
        }
      } catch (error) {
        setError('Error fetching stock data');
      }
    };

    fetchStockData();
  }, [symbol]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ticker-page">
      <h1>{stockData.companyName} ({stockData.symbol})</h1>
      <p>Exchange: {stockData.exchange}</p>
      <p>Current Price: ${stockData.currentPrice}</p>
      <p>Price Change: ${stockData.priceChange}</p>
      <p>Volume: {stockData.volume.toLocaleString()}</p>
      <p>Average Volume: { stockData.averageVolume.toLocaleString()}</p>
      <p>Day High: ${stockData.dayHigh}</p>
      <p>Day Low: ${stockData.dayLow}</p>
      <p>Market Cap: ${stockData.marketCap.toLocaleString()}</p>
      <p>52-Week High: ${stockData["52WeekHigh"]}</p>
      <p>52-Week Low: ${stockData["52WeekLow"]}</p>
      <h2>News</h2>
      <ul>
        {stockData.news.map((newsItem, index) => (
          <li key={index}>
            <a href={newsItem.link} target="_blank" rel="noopener noreferrer">{newsItem.title}</a>
          </li>
        ))}
      </ul>
      <h2>Officers</h2>
      <ul>
        {stockData.officers.map((officer, index) => (
          <li key={index}>{officer.name} - {officer.title}</li>
        ))}
      </ul>
      <p>Address: {stockData.address}</p>
      <p>Website: <a href={stockData.website} target="_blank" rel="noopener noreferrer">{stockData.website}</a></p>
    </div>
  );
};

export default TickerPage;