// ./components/Nav.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/forum">Forum</Link></li>
        <li>
          <Link to="/market">Market</Link>
          <ul className="dropdown">
            <li><Link to="/market/cryptocurrency">Cryptocurrency</Link></li>
            <li><Link to="/market/trending">Trending</Link></li>
            <li><Link to="/market/losers">Losers</Link></li>
            <li><Link to="/market/mutual-funds">Mutual Funds</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/personalFinance">Personal Finance</Link>
          <ul className="dropdown">
            <li><Link to="/personalFinance/credit-card">Credit Card</Link></li>
            <li><Link to="/personalFinance/personal-loans">Personal Loans</Link></li>
            <li><Link to="/personalFinance/insurance">Insurance</Link></li>
            <li><Link to="/personalFinance/mortgage-calculator">Mortgage Calculator</Link></li>
            <li><Link to="/personalFinance/taxes">Taxes</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/research">Research</Link>
          <ul className="dropdown">
            <li><Link to="/research/screeners">Screeners</Link></li>
            <li><Link to="/research/watchlist">Watchlist</Link></li>
            <li><Link to="/research/calendar">Calendar</Link></li>
            <li><Link to="/research/stock-comparison">Stock Comparison</Link></li>
            <li><Link to="/research/advice-charts">Advice Charts</Link></li>
            <li><Link to="/research/currency-converter">Currency Converter</Link></li>
            <li><Link to="/research/investment-ideas">Investment Ideas</Link></li>
            <li><Link to="/research/research-report">Research Report</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/news">News</Link>
          <ul className="dropdown">
            <li><Link to="/news/latest-news">Latest News</Link></li>
            <li><Link to="/news/stock-market-news">Stock Market</Link></li>
            <li><Link to="/news/originals">Originals</Link></li>
            <li><Link to="/news/economics">Economics</Link></li>
            <li><Link to="/news/housing">Housing</Link></li>
            <li><Link to="/news/earnings">Earnings</Link></li>
            <li><Link to="/news/tech">Tech</Link></li>
            <li><Link to="/news/crypto-news">Crypto</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
