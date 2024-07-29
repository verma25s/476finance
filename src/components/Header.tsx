import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav'; 
import './Header.css';
import { SearchBar } from '../pages/searchBar';
import Aside from './Aside'; 
import logo from './logo1.png';

const Header: React.FC = () => {
  return (
    <div>
    <header>
    <div className="logo">
          <Link to="/" className="logo">
            <img src={logo} alt="476 Finance Logo" className="logo-image" /> 
          </Link>
      </div>
          <Nav />
          <Aside/>
          </header>
          <SearchBar/>
      </div>
  );
}

export default Header;


