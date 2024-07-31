// ./pages/personalFinance/PersonalFinance.tsx
// importing react 
import React from 'react';
// importing react's (link,routes,route) part
import { Link, Routes, Route } from 'react-router-dom';
// importing component of  credit cards
import CreditCard from './creditCard/CreditCard'; 
// importing component of  personal loans
import PersonalLoans from './PersonalLoans';
// importing component of  mortgage calculator
import MortgageCalculator from './MortgageCalculator';
// importing component of  taxes
import Taxes from './Taxes';
// importing CSS component of PersonalFinance
import './PersonalFinance.css';

// function component for Personal FInance
const PersonalFinance: React.FC = () => {
  return (
    <div className="personal-finance-container"> 
      <h1>Personal Finance</h1>
      <p>Here you can find information about managing your personal finances.</p>
      <div className="finance-options">
        <Link to="credit-card" className="finance-box">Credit Card</Link>
        <Link to="personal-loans" className="finance-box">Personal Loans</Link>
        <Link to="mortgage-calculator" className="finance-box">Mortgage Calculator</Link>
        <Link to="taxes" className="finance-box">Taxes</Link>
      </div>
      <Routes>
        <Route path="credit-card" element={<CreditCard />} />
        <Route path="personal-loans" element={<PersonalLoans />} />
        <Route path="mortgage-calculator" element={<MortgageCalculator />} />
        <Route path="taxes" element={<Taxes />} />
      </Routes>
    </div>
  );
};
// exporting the PersonalFinance component as the default export
export default PersonalFinance;
