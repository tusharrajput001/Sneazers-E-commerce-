import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('userEmail') || null;
  });
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('_id') || null; // Use _id instead of userId
  });

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
      if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
      }
      if (userId) {
        localStorage.setItem('_id', userId); // Store _id in localStorage
      }
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('_id');     
    }
  }, [isLoggedIn, userEmail, userId]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
