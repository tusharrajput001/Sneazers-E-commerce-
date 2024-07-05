import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import "../../fonts/fonts.css";
import { useAuth } from "../../Contexts/AuthContext";
import { useCart } from "../../Contexts/CartContext";

function Navbar({ handleSearch }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, userEmail } = useAuth();
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
    window.location.reload();
  };

  const getUserName = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  };

  const handleSearchInput = (e) => {
    const searchText = e.target.value.trim();
    handleSearch(searchText);
  };

  return (
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
            <div className="search-bar">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchInput}
              />
            </div>
          </li>

          {isLoggedIn ? (
            <>
              {userEmail !== "tusharr0491@gmail.com" && (
                <>
                  <li className="icon-wrapper">
                    <Link to="/cart">
                      <i className="fas fa-shopping-bag black-icon"></i>
                      {cart.length > 0 && (
                        <span className="badge">{cart.length}</span>
                      )}
                    </Link>
                  </li>
                  <li className="icon-wrapper">
                    <Link to="/wishlist">
                      <i className="fa-sharp fa-regular fa-heart black-icon"></i>
                      {/* <span className="badge">0</span> */}
                    </Link>
                  </li>

                  <li className="user-logo">
                    <Link to="/account">
                      <i className="fas fa-user black-icon"></i>
                    </Link>
                  </li>
                  <li className="user-name">
                    <Link
                      to="/account"
                      style={{ textDecoration: "none", color: "black" }}
                    >
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
  );
}

export default Navbar;
