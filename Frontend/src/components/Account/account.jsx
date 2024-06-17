import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./account.css";
import Orders from "../Orders/Orders";

function Account() {
  const navigate = useNavigate();
  const getEmail = localStorage.getItem("userEmail");
  const getUser = localStorage.getItem("userName");
  const [user, setUser] = useState({
    name: getUser,
    email: getEmail,
    avatar:
      "https://imgs.search.brave.com/bHpTjt49BE6IN6GPjmIm4FaNZXFj4xFH3ey8KXtPew0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw", // Placeholder for user avatar URL
  });

  useEffect(() => {
    // Fetch user data from local storage or API
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    navigate("/login");
    window.location.reload();
  };

  const handleOrdersPage = () => {
    navigate("/orders ");
  };

  const handleWishlistPage = () => {
    navigate("/wishlist");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <section className="AccSection">
      <div className="parent-container">
        <div className="accountContainer">
          <div className="accountInfo">
            <div className="avatar">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="Avatar"
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
            </div>
            <div className="userInfo">
              <h4>{user.name}</h4>
              <h6>{user.email}</h6>
            </div>
            <div className="buttons">
              <ol className="numbered-list">
                <li>
                  <button
                    onClick={handleOrdersPage}
                    className="edit-profile-btn"
                  >
                    My Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleWishlistPage}
                    className="edit-profile-btn"
                  >
                    Wishlist
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleEditProfile}
                    className="edit-profile-btn"
                  >
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;
