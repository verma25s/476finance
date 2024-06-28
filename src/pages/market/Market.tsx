// Market.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StockMarket from './StockMarket';
import Cryptocurrency from './Cryptocurrency';
import Trending from './Trending';

const Market: React.FC = () => {
  return (
    <div>
      <h1>Market</h1>
      <nav>
        <ul>
          <li><Link to="stockMarket">Stock Market</Link></li>
          <li><Link to="cryptocurrency">Cryptocurrency</Link></li>
          <li><Link to="trending">Trending</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="stockMarket" element={<StockMarket />} />
        <Route path="cryptocurrency" element={<Cryptocurrency />} />
        <Route path="trending" element={<Trending />} />
      </Routes>
    </div>
  );
}

export default Market;
