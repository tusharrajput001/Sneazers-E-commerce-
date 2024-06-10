import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./account.css";

function Account() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Event handler for logout button click
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
    window.location.reload();
  };

  return (
    <section className="AccSection">
      <div className="parent-container">
        <div className="accountContainer">
          <div className="accountInfo">
            <div className="avatar">
              <img alt="Avatar"></img>
            </div>
            <div>
              <h4>Name</h4>
            </div>
            <div>
              <h6>abcd@gmail.com</h6>
            </div>
            <div>
              <button onClick={handleLogout}>Logout</button>
              {/* Attach event handler */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;
