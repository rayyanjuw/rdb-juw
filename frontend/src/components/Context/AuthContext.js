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

// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(() => {
//     const token = localStorage.getItem('token');
//     return token ? { token } : null; // Initialize state with token if exists
//   });

//   const login = (userData) => {
//     setCurrentUser(userData);
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem('token'); // Remove token on logout
//   };

  
//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };




import React, { createContext, useContext, useState, useEffect } from 'react';

// Utility function to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
  const expiryTime = tokenPayload.exp * 1000; // Convert to milliseconds
  return Date.now() > expiryTime;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('token');
    
    // Initialize state with token if exists and is not expired
    if (token && !isTokenExpired(token)) {
      return { token };
    }
    return null;
  });

  useEffect(() => {
    // Automatically logout if token expires
    const token = currentUser?.token;
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [currentUser]);

  const login = (userData) => {
    localStorage.setItem('token', userData.token); // Save token to localStorage
    setCurrentUser(userData); // Set the current user
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
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

