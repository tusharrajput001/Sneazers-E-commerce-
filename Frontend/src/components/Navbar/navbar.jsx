import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import "../../fonts/fonts.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // state for hamburger menu
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search bar visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="navbar-heading">
            Sneazers
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>

        {/* Navigation Options */}
        <div className={`navbar-options ${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a href="#">High-top</a>
            </li>
            <li>
              <a href="#">Mid-top</a>
            </li>
            <li>
              <a href="#">Low-top</a>
            </li>
            <li>
              <a href="#">Slip-ons</a>
            </li>
          </ul>
        </div>

        {/* Icons */}
        <div className="navbar-icons">
          <ul>
            {/* Search Icon */}
            <li>
              <a href="#" onClick={toggleSearch}>
                <i className="fas fa-search black-icon"></i>
              </a>
            </li>
            {/* User Icon */}
            <li>
              <Link to="/login">
                <i className="fas fa-user black-icon"></i>
              </Link>
            </li>
            {/* Cart Icon */}
            <li>
              <a href="#">
                <i className="fas fa-shopping-cart black-icon"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* Search Bar */}
      <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
        <input type="text" placeholder="Search..." />
        {/* Close Button */}
        <button className="close-btn" onClick={toggleSearch}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </>
  );
}

export default Navbar;