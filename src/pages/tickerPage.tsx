import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './tickerPage.css';
import { useCookies } from 'react-cookie';
import { TickerGraph } from './tickergraph';
import {StockNews} from './stocknews';


interface StockData {
  symbol: string;
  shortName: string;
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
  
  address1: string;
  website: string;
  // Add other fields you want to include
  ask: number;
  bid: number;
  bookValue: number;
  dividendRate: number;
  dividendYield: number;
  earningsGrowth: number;
  earningsQuarterlyGrowth: number;
  ebitda: number;
  ebitdaMargins: number;
  enterpriseValue: number;
  priceToBook: number;
  priceToSalesTrailing12Months: number;
  profitMargins: number;
  quickRatio: number;
  returnOnAssets: number;
  returnOnEquity: number;
  revenueGrowth: number;
  revenuePerShare: number;
  trailingPE: number;
  trailingPEG: number;
  twoHundredDayAverage: number;
  // Add more fields as needed
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
        const response = await fetch(`/stock/${symbol}`);
        if (response.ok) {
          const data: StockData = await response.json();
          setStockData(data);
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
        body: JSON.stringify({ email: cookies.userEmail, symbol: symbol }),
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
        body: JSON.stringify({ email: cookies.userEmail, symbol: symbol }),
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

  const formatValue = (value: number | undefined) => value !== undefined ? value.toLocaleString() : 'N/A';

  const rows = [
    { label: 'Symbol', value: stockData.symbol },
    { label: 'Company Name', value: stockData.shortName },
    { label: 'Exchange', value: stockData.exchange },
    { label: 'Current Price', value: `$${formatValue(stockData.currentPrice)}` },
    { label: 'Price Change', value: `$${formatValue(stockData.priceChange)}` },
    { label: 'Volume', value: formatValue(stockData.volume) },
    { label: 'Average Volume', value: formatValue(stockData.averageVolume) },
    { label: 'Day High', value: `$${formatValue(stockData.dayHigh)}` },
    { label: 'Day Low', value: `$${formatValue(stockData.dayLow)}` },
    { label: 'Market Cap', value: `$${formatValue(stockData.marketCap)}` },
    { label: '52-Week High', value: `$${formatValue(stockData["52WeekHigh"])}` },
    { label: '52-Week Low', value: `$${formatValue(stockData["52WeekLow"])}` },
    { label: 'Ask', value: `$${formatValue(stockData.ask)}` },
    { label: 'Bid', value: `$${formatValue(stockData.bid)}` },
    { label: 'Book Value', value: `$${formatValue(stockData.bookValue)}` },
    { label: 'Dividend Rate', value: `$${formatValue(stockData.dividendRate)}` },
    { label: 'Dividend Yield', value: formatValue(stockData.dividendYield) },
    { label: 'Earnings Growth', value: formatValue(stockData.earningsGrowth) },
    { label: 'Earnings Quarterly Growth', value: formatValue(stockData.earningsQuarterlyGrowth) },
    { label: 'EBITDA', value: formatValue(stockData.ebitda) },
    { label: 'EBITDA Margins', value: formatValue(stockData.ebitdaMargins) },
    { label: 'Enterprise Value', value: formatValue(stockData.enterpriseValue) },
    { label: 'Price to Book', value: formatValue(stockData.priceToBook) },
    { label: 'Price to Sales (TTM)', value: formatValue(stockData.priceToSalesTrailing12Months) },
    { label: 'Profit Margins', value: formatValue(stockData.profitMargins) },
    { label: 'Quick Ratio', value: formatValue(stockData.quickRatio) },
    { label: 'Return on Assets', value: formatValue(stockData.returnOnAssets) },
    { label: 'Return on Equity', value: formatValue(stockData.returnOnEquity) },
    { label: 'Revenue Growth', value: formatValue(stockData.revenueGrowth) },
    { label: 'Revenue per Share', value: formatValue(stockData.revenuePerShare) },
    { label: 'Trailing P/E', value: formatValue(stockData.trailingPE) },
    { label: 'Trailing PEG', value: formatValue(stockData.trailingPEG) },
    { label: '200-Day Average', value: formatValue(stockData.twoHundredDayAverage) },
    { label: 'Address', value: stockData.address1 },
    { label: 'Website', value: stockData.website ? <a href={stockData.website} target="_blank" rel="noopener noreferrer">{stockData.website}</a> : 'N/A' },
  ];

  return (
    <div className="ticker-page">
      <h4>Symbol: {stockData.symbol}</h4>
      <h6>Price: {stockData.currentPrice}</h6>
      {cookies.userEmail ? (
        <div className="watchlist-controls">
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
      ) : (
        <p>Please login to add to watchlist</p>
      )}

      <TickerGraph />
      <h1>{stockData.shortName } ({stockData.symbol || 'N/A'})</h1>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.label}</td>
              <td>{row.value}</td>
              {index + 1 < rows.length ? (
                <>
                  <td>{rows[index + 1].label}</td>
                  <td>{rows[index + 1].value}</td>
                </>
              ) : (
                <>
                  <td></td>
                  <td></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>


      <StockNews />

      

      
    </div>
  );
};

export default TickerPage;