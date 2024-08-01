// Market.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {Top_gainers} from '../top_gainers';
import {Top_losers} from '../Top_losers';
import {Crypto} from '../crypto';
import Trending from '../trending';
export const Market = () => {
  return (
    <div>
      
      <h1>Market</h1>
      <nav>
        <ul>
          <li><Link to="Top Gainers">Top Gainers</Link></li>
          <li><Link to="cryptocurrency">Cryptocurrencies</Link></li>
          <li><Link to="trending">Trending</Link></li>
          <li><Link to="Top Losers">Top Losers</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="Top Gainers" element={<Top_gainers />} />
        <Route path="cryptocurrency" element={<Crypto />} />
        <Route path="trending" element={<Trending />} />
        <Route path="Top Losers" element={<Top_losers />} />
      </Routes>
    </div>
  );
}
export default Market;
