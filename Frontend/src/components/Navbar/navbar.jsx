import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import "../../fonts/fonts.css";
import { useAuth } from "../../Contexts/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoggedIn, userEmail } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>

        <div className="navbar-brand">
          <Link to="/" className="navbar-heading">
            Sneazers
          </Link>
        </div>

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
              <a href="/allproducts">All Products</a>
            </li>
          </ul>
        </div>

        <div className="navbar-icons">
          <ul>
            <li>
              <a href="#" onClick={toggleSearch}>
                <i className="fas fa-search black-icon"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-shopping-cart black-icon"></i>
              </a>
            </li>

            {isLoggedIn ? (
              <>
                {userEmail !== "tusharr0491@gmail.com" && (
                  <>
                    <li className="user-logo">
                      <Link to="/account">
                        <i className="fas fa-user black-icon"></i>
                      </Link>
                    </li>
                    <li className="user-name">
                      <span>Name</span>
                    </li>
                  </>
                )}
                {userEmail === "tusharr0491@gmail.com" && (
                  <li className="user-logo">
                    <Link to="/dashboard">
                      <i className="fas fa-user black-icon mr-3"></i>
                      
                    </Link>
                    <Link to="/dashboard">
                    <li className="user-name">
                      <span> Admin</span>
                    </li>
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <li>
                <Link to="/login">
                  <button className="loginBtn">Login</button>
                </Link>
                <Link to="/register">
                  <button className="signupBtn">SignUp</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className={`search-bar ${isSearchOpen ? "active" : ""}`}>
        <input type="text" placeholder="Search..." />
        <button className="close-btn" onClick={toggleSearch}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </>
  );
}

export default Navbar;
