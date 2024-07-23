import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav'; 
import './Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/components/logo.png" alt="476 Finance Logo" />
        </Link>
        <p><i>Welcome to the new financial world</i></p>
      </div>
      <Nav />
      <div className="search-auth">
        <input type="text" placeholder="Search..." className="search-box" />
        <button className="search-button">Search</button>
        <div className="auth-buttons">
          <Link to="/login" className="login-button">Login</Link>
          <Link to="/create-account" className="create-account-button">Create New Account</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;


