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
    return localStorage.getItem('userId') || null;
  });

  useEffect(() => {
    console.log("AuthContext initialized with userId:", userId);
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
      if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
      }
      if (userId) {
        localStorage.setItem('userId', userId);
      }
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
    }
  }, [isLoggedIn, userEmail, userId]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
