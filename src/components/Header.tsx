import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav'; 
import './Header.css';
import { SearchBar } from '../pages/searchBar';
import Aside from './Aside'; 
import logo from './logo1.png';

  const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
   
    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
    <header>
    <div className="logo">
          <Link to="/" className="logo">
            <img src={logo} alt="476 Finance Logo" className="logo-image" /> 
          </Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div>
          <Nav menuOpen={menuOpen} />
          <Aside/>
          </header>
          <SearchBar/>
      </div>
  );
};

export default Header;


