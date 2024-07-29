import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

interface NavProps {
  menuOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ menuOpen }) => {
  return (
    <nav>
      <ul className={menuOpen ? 'show' : ''}>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/screener">Screener</Link></li>
        <li>
          <Link to="/market">Market</Link>
          <ul className="dropdown">
            <li><Link to="/market/cryptocurrency">Cryptocurrency</Link></li>
            <li><Link to="/market/trending">Trending</Link></li>
            <li><Link to="/market/Top Gainers">Top Gainers</Link></li>
            <li><Link to="/market/Top Losers">Top Losers</Link></li>
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
        <li><Link to="/news">News</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
