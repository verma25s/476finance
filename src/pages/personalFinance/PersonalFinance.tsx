// ./pages/personalFinance/PersonalFinance.tsx
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import CreditCard from './creditCard/CreditCard';
import StudentLoans from './StudentLoans';
import PersonalLoans from './PersonalLoans';
import Insurance from './Insurance';
import MortgageCalculator from './MortgageCalculator';
import Taxes from './Taxes';
import './PersonalFinance.css';

const PersonalFinance: React.FC = () => {
  return (
    <div>
      <h1>Personal Finance</h1>
      <p>Here you can find information about managing your personal finances.</p>
      <div className="finance-options">
        <Link to="credit-card" className="finance-box">Credit Card</Link>
        <Link to="student-loans" className="finance-box">Student Loans</Link>
        <Link to="personal-loans" className="finance-box">Personal Loans</Link>
        <Link to="insurance" className="finance-box">Insurance</Link>
        <Link to="mortgage-calculator" className="finance-box">Mortgage Calculator</Link>
        <Link to="taxes" className="finance-box">Taxes</Link>
      </div>
      <Routes>
        <Route path="credit-card" element={<CreditCard />} />
        <Route path="student-loans" element={<StudentLoans />} />
        <Route path="personal-loans" element={<PersonalLoans />} />
        <Route path="insurance" element={<Insurance />} />
        <Route path="mortgage-calculator" element={<MortgageCalculator />} />
        <Route path="taxes" element={<Taxes />} />
      </Routes>
    </div>
  );
};

export default PersonalFinance;
