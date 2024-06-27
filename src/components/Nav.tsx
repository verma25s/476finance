// Nav.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav: React.FC = () => {
  return (
        <nav>
          <ul>
            <li><Link to="/pages/market/Market">Market</Link>
              <ul className="dropdown">
                <li><Link to="/pages/market/StockMarket">Stock Market</Link></li>
                <li><Link to="/market/Cryptocurrency">Cryptocurrency</Link></li>
                <li><Link to="/market/Trending">Trending</Link></li>
                <li><a href="#/market/losers">Losers</a></li>
                <li><a href="#/market/mutual-funds">Mutual Funds</a></li>
                <li><a href="#/market/future">Future</a></li>
              </ul>
            </li>
            <li><a href="#personal-finance">Personal Finance</a>
              <ul className="dropdown">
                <li><a href="#credit-cards">Credit Cards</a></li>
                <li><a href="#student-loans">Student Loans</a></li>
                <li><a href="#personal-loans">Personal Loans</a></li>
                <li><a href="#insurance">Insurance</a></li>
                <li><a href="#mortgages">Mortgages</a></li>
                <li><a href="#mortgage-calculator">Mortgage Calculator</a></li>
                <li><a href="#taxes">Taxes</a></li>
              </ul>
            </li>
            <li><a href="#research">Research</a>
              <ul className="dropdown">
                <li><a href="#screeners">Screeners</a></li>
                <li><a href="#watchlist">Watchlist</a></li>
                <li><a href="#calendar">Calendar</a></li>
                <li><a href="#stock-comparison">Stock Comparison</a></li>
                <li><a href="#advice-charts">Advice Charts</a></li>
                <li><a href="#currency-converter">Currency Converter</a></li>
                <li><a href="#investment-ideas">Investment Ideas</a></li>
                <li><a href="#research-report">Research Report</a></li>
              </ul>
            </li>
            <li><a href="#news">News</a>
              <ul className="dropdown">
                <li><a href="#latest-news">Latest News</a></li>
                <li><a href="#stock-market-news">Stock Market</a></li>
                <li><a href="#originals">Originals</a></li>
                <li><a href="#economics">Economics</a></li>
                <li><a href="#housing">Housing</a></li>
                <li><a href="#earnings">Earnings</a></li>
                <li><a href="#tech">Tech</a></li>
                <li><a href="#crypto-news">Crypto</a></li>
              </ul>
            </li>
            <li><a href="#newcomers">Newcomers</a>
              <ul className="dropdown">
                <li><a href="#student">Student</a></li>
                <li><a href="#non-student">Non-Student</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      );
}

export default Nav;
