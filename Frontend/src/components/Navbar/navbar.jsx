import React, { useState } from 'react';
import './navbar.css';
import '../../fonts/fonts.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-heading">Sneazers</span>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      {/* Navigation Options */}
      <div className={`navbar-options ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#">High-top</a></li>
          <li><a href="#">Mid-top</a></li>
          <li><a href="#">Low-top</a></li>
          <li><a href="#">Slip-ons</a></li>
        </ul>
      </div>

      {/* Icons */}
      <div className="navbar-icons">
        <ul>
          <li><a href="#"><i className="fas fa-search black-icon"></i></a></li>
          <li><a href="#"><i className="fas fa-user black-icon"></i></a></li>
          <li><a href="#"><i className="fas fa-shopping-cart black-icon"></i></a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
