import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import "../../fonts/fonts.css";
import { useAuth } from "../../Contexts/AuthContext";
import { useCart } from "../../Contexts/CartContext"; // Import the useCart hook

function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoggedIn, userEmail } = useAuth();
  const { cart } = useCart(); // Get the cart from context

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
    window.location.reload();
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Function to extract name from email
  const getUserName = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
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
              <a href="/high-top">High-top</a>
            </li>
            <li>
              <a href="/mid-top">Mid-top</a>
            </li>
            <li>
              <a href="/low-top">Low-top</a>
            </li>
            <li>
              <a href="/sports">Sports</a>
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

            {isLoggedIn ? (
              <>
                {userEmail !== "tusharr0491@gmail.com" && (
                  <>
                    <li className="cart-icon-wrapper">
                      <Link to="/cart">
                        <i className="fas fa-shopping-cart black-icon"></i>
                        <span className="cart-count">{cart.length}</span> {/* Display cart count */}
                      </Link>
                    </li>
                    <li className="user-logo">
                      <Link to="/account">
                        <i className="fas fa-user black-icon"></i>
                      </Link>
                    </li>
                    <li className="user-name">
                      <Link to="/account" style={{ textDecoration: 'none', color:'black' }}>
                        <span>{getUserName(userEmail)}</span>
                      </Link>
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
                    <button onClick={handleLogout}>Logout</button>
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
