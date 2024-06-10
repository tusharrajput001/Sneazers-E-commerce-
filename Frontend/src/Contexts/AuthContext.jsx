import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
      if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
      }
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
    }
  }, [isLoggedIn, userEmail]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
