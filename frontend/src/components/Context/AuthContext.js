// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("")
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   // Check token validity on component mount
  //   const token = localStorage.getItem('token');
  //   console.log('Token retrieved from localStorage:', token);
  //   if (token) {
  //     setCurrentUser({ token });
  //   }
  // }, [token]);


    // Function to login and set user
    const login = (user) => {
        // Store token in localStorage
        localStorage.setItem('token', user.token);
        setCurrentUser(user);
      };
    
      // Function to logout
      const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
      };


  // const login = (user) => setCurrentUser(user);
  // const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// export const useAuth = () => {
//     return useContext(AuthContext);
//   };


