import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./navbar.css";
import { RxHamburgerMenu, RxCross2} from "react-icons/rx";


export const Navbar = () =>{
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
      };
     
const closeMenuonMobile = () => {
       
           setShowMenu(false);
         
       };



return (
<header className="navHeader" >
  <nav className="nav-container">
        <NavLink to="/" className="logo" onClick={closeMenuonMobile}>
   

       </NavLink>
       
       <div  className={`nav-options ${showMenu ? "showmenu" :  "hidemenu"}`}>
      
     <ul className="nav-list">
      
    
    <li className="nav-list-child">
      <NavLink to="/Home" className="nav-link" onClick={closeMenuonMobile}>
        Home
      </NavLink>
    </li>

    <li className="nav-list-child">
      <NavLink to="/Scanner" className="nav-link" onClick={closeMenuonMobile} >
        Scanner
        
      </NavLink>
    </li>

    <li className="nav-list-child">
      <NavLink to="./Forum" className="nav-link" onClick={closeMenuonMobile}>
        Forum
      </NavLink>
    </li>
</ul>

<div className="nav-menu-close" onClick={closeMenuonMobile}><RxCross2 /> </div>
       </div>
<div className="nav-menu" onClick={toggleMenu} >  <RxHamburgerMenu /></div>

</nav>

</header>
);



}