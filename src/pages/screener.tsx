import React, { useState } from 'react';
import axios from 'axios';


interface Stock {
  symbol: string;
  companyName: string;
  price: number;
  exchangeShortName: string;
  volume: number;
  marketCap: number;
  sector: string;
  industry: string;
}

export const Screener: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filters, setFilters] = useState({
    // All this data is returned by the Financial Modeling perp api


    marketCapMoreThan: '',
    marketCapLowerThan: '',
    priceMoreThan: '',
    priceLowerThan: '',
    betaMoreThan: '',
    betaLowerThan: '',
    volumeMoreThan: '',
    volumeLowerThan: '',
    dividendMoreThan: '',
    dividendLowerThan: '',
    isEtf: '',
    isFund: '',
    isActivelyTrading: '',
    sector: '',
    industry: '',
    country: '',
    exchange: '',
    limit: 20,
    
  });
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/screener', {
        params: {
          ...filters,
        },
      });
      console.log(response.data);
      setStocks(response.data);
    } catch (error) {
      setError('Error fetching data');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = () => {
    fetchData();
  };

  const sectors = ["", "Consumer Cyclical", "Energy", "Technology", "Industrials", "Financial Services", "Basic Materials", "Communication Services", "Consumer Defensive", "Healthcare", "Real Estate", "Utilities", "Industrial Goods", "Financial", "Services", "Conglomerates"];
  const industries = ["", "Autos", "Banks", "Banks Diversified", "Software", "Banks Regional", "Beverages Alcoholic", "Beverages Brewers", "Beverages Non-Alcoholic"];
  const countries = ["", "US", "UK", "MX", "BR", "RU", "HK", "CA"];
  const exchanges = ["", "nyse", "nasdaq", "amex", "euronext", "tsx", "etf", "mutual_fund"];
  const booleanOptions = ["", "true", "false"];

  return (
    <div>
      <h1>Stock Screener</h1>
      <div>
        <label>
          Market Cap More Than:
          <select name="marketCapMoreThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="1000000000">1 Billion</option>
            <option value="5000000000">5 Billion</option>
            <option value="10000000000">10 Billion</option>
          </select>
        </label>
        <label>
          Market Cap Lower Than:
          <select name="marketCapLowerThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="1000000000">1 Billion</option>
            <option value="5000000000">5 Billion</option>
            <option value="10000000000">10 Billion</option>
          </select>
        </label>
        <label>
          Price More Than:
          <select name="priceMoreThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
        <label>
          Price Lower Than:
          <select name="priceLowerThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </label>
        <label>
          Beta More Than:
          <select name="betaMoreThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
          </select>
        </label>
        <label>
          Beta Lower Than:
          <select name="betaLowerThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
          </select>
        </label>
        <label>
          Volume More Than:
          <select name="volumeMoreThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="10000">10,000</option>
            <option value="100000">100,000</option>
            <option value="1000000">1,000,000</option>
          </select>
        </label>
        <label>
          Volume Lower Than:
          <select name="volumeLowerThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="10000">10,000</option>
            <option value="100000">100,000</option>
            <option value="1000000">1,000,000</option>
          </select>
        </label>
        <label>
          Dividend More Than:
          <select name="dividendMoreThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="1">1%</option>
            <option value="2">2%</option>
            <option value="3">3%</option>
          </select>
        </label>
        <label>
          Dividend Lower Than:
          <select name="dividendLowerThan" onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="1">1%</option>
            <option value="2">2%</option>
            <option value="3">3%</option>
          </select>
        </label>
        <label>
          Is ETF:
          <select name="isEtf" onChange={handleFilterChange}>
            {booleanOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Is Fund:
          <select name="isFund" onChange={handleFilterChange}>
            {booleanOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Is Actively Trading:
          <select name="isActivelyTrading" onChange={handleFilterChange}>
            {booleanOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Sector:
          <select name="sector" onChange={handleFilterChange}>
            {sectors.map((sector, index) => (
              <option key={index} value={sector}>{sector}</option>
            ))}
          </select>
        </label>
        <label>
          Industry:
          <select name="industry" onChange={handleFilterChange}>
            {industries.map((industry, index) => (
              <option key={index} value={industry}>{industry}</option>
            ))}
          </select>
        </label>
        <label>
          Country:
          <select name="country" onChange={handleFilterChange}>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </label>
        <label>
          Exchange:
          <select name="exchange" onChange={handleFilterChange}>
            {exchanges.map((exchange, index) => (
              <option key={index} value={exchange}>{exchange}</option>
            ))}
          </select>
        </label>
        <label>
          Limit:
          <select name="limit" onChange={handleFilterChange}>
            
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Exchange</th>
            <th>Volume</th>
            <th>Market Cap</th>
            <th>Sector</th>
            <th>Industry</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length > 0 ? (
            stocks.map(stock => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.companyName}</td>
                <td>{stock.exchangeShortName}</td>
                <td>{stock.price}</td>
                <td>{stock.volume}</td>
                <td>{stock.marketCap}</td>
                <td>{stock.sector}</td>
                <td>{stock.industry}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Stocks Found</td>
            </tr>
          )}
        </tbody>
      </table>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Screener;