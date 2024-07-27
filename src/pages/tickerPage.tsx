import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './tickerPage.css';
import { useCookies } from 'react-cookie';


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
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  const [watchlistLoading, setWatchlistLoading] = useState<boolean>(true);
  const [watchlistError, setWatchlistError] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']);

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

  useEffect(() => {
    const checkIfInWatchlist = async () => {
      if (!symbol) return;
      setWatchlistLoading(true);
      try {
        const response = await fetch(`/check-if-in-watchlist?symbol=${symbol}&email=${cookies.userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setIsInWatchlist(data.inWatchlist);
        } else {
          setWatchlistError('Error checking watchlist status');
        }
      } catch (error) {
        setWatchlistError('Error checking watchlist status');
      } finally {
        setWatchlistLoading(false);
      }
    };

    checkIfInWatchlist();
  }, [symbol]);

  const handleAddToWatchlist = async () => {
    if (!symbol) return;
    try {
      const response = await fetch('/add-to-watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:cookies.userEmail, symbol:symbol }),
      });
      if (response.ok) {
        setIsInWatchlist(true);
      } else {
        setWatchlistError('Error adding to watchlist');
      }
    } catch (error) {
      setWatchlistError('Error adding to watchlist');
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (!symbol) return;
    try {
      const response = await fetch('/remove-from-watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:cookies.userEmail, symbol:symbol }),
      });
      if (response.ok) {
        setIsInWatchlist(false);
      } else {
        setWatchlistError('Error removing from watchlist');
      }
    } catch (error) {
      setWatchlistError('Error removing from watchlist');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ticker-page">
      <h1>{stockData.companyName || 'N/A'} ({stockData.symbol || 'N/A'})</h1>
      <p>Exchange: {stockData.exchange || 'N/A'}</p>
      <p>Current Price: ${stockData.currentPrice !== undefined ? stockData.currentPrice : 'N/A'}</p>
      <p>Price Change: ${stockData.priceChange !== undefined ? stockData.priceChange : 'N/A'}</p>
      <p>Volume: {stockData.volume !== undefined ? stockData.volume.toLocaleString() : 'N/A'}</p>
      <p>Average Volume: {stockData.averageVolume !== undefined ? stockData.averageVolume.toLocaleString() : 'N/A'}</p>
      <p>Day High: ${stockData.dayHigh !== undefined ? stockData.dayHigh : 'N/A'}</p>
      <p>Day Low: ${stockData.dayLow !== undefined ? stockData.dayLow : 'N/A'}</p>
      <p>Market Cap: ${stockData.marketCap !== undefined ? stockData.marketCap.toLocaleString() : 'N/A'}</p>
      <p>52-Week High: ${stockData["52WeekHigh"] !== undefined ? stockData["52WeekHigh"] : 'N/A'}</p>
      <p>52-Week Low: ${stockData["52WeekLow"] !== undefined ? stockData["52WeekLow"] : 'N/A'}</p>
      <h2>News</h2>
      <ul>
        {stockData.news && stockData.news.length > 0 ? (
          stockData.news.map((newsItem, index) => (
            <li key={index}>
              <a href={newsItem.link} target="_blank" rel="noopener noreferrer">
                {newsItem.title || 'No Title'}
              </a>
            </li>
          ))
        ) : (
          <li>No news available.</li>
        )}
      </ul>
      <h2>Officers</h2>
      <ul>
        {stockData.officers && stockData.officers.length > 0 ? (
          stockData.officers.map((officer, index) => (
            <li key={index}>
              {officer.name || 'No Name'} - {officer.title || 'No Title'}
            </li>
          ))
        ) : (
          <li>No officers available.</li>
        )}
      </ul>
      <p>Address: {stockData.address || 'N/A'}</p>
      <p>Website: {stockData.website ? <a href={stockData.website} target="_blank" rel="noopener noreferrer">{stockData.website}</a> : 'N/A'}</p>
      {cookies.userEmail ?  <div className="watchlist-controls">
        {watchlistLoading ? (
          <p>Loading watchlist status...</p>
        ) : watchlistError ? (
          <p>{watchlistError}</p>
        ) : isInWatchlist ? (
          <button onClick={handleRemoveFromWatchlist}>Remove from Watchlist</button>
        ) : (
          <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
        )}
      </div>
      : <p>Please login to add to watchlist</p>}
      
    </div>
  );
};

export default TickerPage;