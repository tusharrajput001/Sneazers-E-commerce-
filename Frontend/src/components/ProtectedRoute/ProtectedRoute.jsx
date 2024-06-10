import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, userEmail } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (userEmail !== "tusharr0491@gmail.com") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
