import React from 'react';
import './navbar.css'; // Import CSS file for styling if needed

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-heading">Sneazers</span>
      </div>
      <div className="navbar-options">
        <ul>
          <li><a href="#">High-top</a></li>
          <li><a href="#">Mid-top</a></li>
          <li><a href="#">Low-top</a></li>
          <li><a href="#">Slip-ons</a></li>
        </ul>
      </div>
      <div className="navbar-icons">
        <ul>
          <li><a href="#"><i className="fas fa-search"></i></a></li>
          <li><a href="#"><i className="fas fa-user"></i></a></li>
          <li><a href="#"><i className="fas fa-shopping-cart"></i></a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
