// PersonalFinance.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreditCard from './CreditCard';

const Market: React.FC = () => {
  return (
    <div>
      <h1>Market</h1>
      <nav>
        <ul>
          <li><Link to="Creditcard">Credit Card</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="CreditCard" element={<CreditCard />} />
      </Routes>
    </div>
  );
}

export default Market;
