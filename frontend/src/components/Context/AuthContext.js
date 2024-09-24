// AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState("")
//   const [currentUser, setCurrentUser] = useState(null);




//     // Function to login and set user
//     const login = (user) => {
//         // Store token in localStorage
//         localStorage.setItem('token', user.token);
//         setCurrentUser(user);
//       };
    
//       // Function to logout
//       const logout = () => {
//         localStorage.removeItem('token');
//         setCurrentUser(null);
//       };


//   // const login = (user) => setCurrentUser(user);
//   // const logout = () => setCurrentUser(null);

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



// chatgpt

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null; // Initialize state with token if exists
  });

  const login = (userData) => {
    setCurrentUser(userData);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token'); // Remove token on logout
  };

  // // Check localStorage for token on initial load
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // You can also retrieve user information here if available
  //     setCurrentUser({ token }); // Set the current user state if a token exists
  //   }
  // }, []);

  // // Function to login and set user
  // const login = (user) => {
  //   localStorage.setItem('token', user.token);
  //   setCurrentUser(user);
  // };

  // // Function to logout
  // const logout = () => {
  //   localStorage.removeItem('token');
  //   setCurrentUser(null);
  // };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};








// export const useAuth = () => {
//     return useContext(AuthContext);
//   };






// chatgpt

// AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // Check token validity on component mount
//     const token = localStorage.getItem('token');
//     if (token) {
//       setCurrentUser({ token });
//     }
//   }, []);

//   // Function to login and set user
//   const login = (user) => {
//     // Store token in localStorage
//     localStorage.setItem('token', user.token);
//     setCurrentUser(user);
//   };

//   // Function to logout
//   const logout = () => {
//     localStorage.removeItem('token');
//     setCurrentUser(null);
//   };

//   // Function to check if the user is authenticated
//   const isAuthenticated = () => {
//     return !!currentUser; // Returns true if user is authenticated
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

