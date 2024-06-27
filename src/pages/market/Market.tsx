// Market.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StockMarket from './StockMarket';
import Cryptocurrency from './Cryptocurrency';
import Trending from './Trending';

const Market: React.FC = () => {
    return (
    <Routes>
      <Route path="/market/stockMarket" element={<StockMarket />} />
      <Route path="/market/cryptocurrency" element={<Cryptocurrency />} />
      <Route path="/market/Trending" element={<Trending />} />
      {/* Add other routes for additional dropdown options */}
    </Routes>
  );
}

export default Market;
