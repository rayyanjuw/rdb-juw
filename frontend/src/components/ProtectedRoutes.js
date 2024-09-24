// import React from 'react';
// import { Navigate } from 'react-router-dom';


// const ProtectedRoutes = ({ children }) => {
//     const isAuthenticated = localStorage.getItem('token');

//     if (!isAuthenticated) {
//         return <Navigate to="/" />; 
//     }

//     return children; 
// };

// export default ProtectedRoutes;

import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const { isAuthenticated } = useAuth();

//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 isAuthenticated ? (
//                     <Component {...props} />
//                 ) : (
//                     <Navigate to="/login" />
//                 )
//             }
//         />
//     );
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
    const { currentUser } = useAuth();
    console.log('Current user in PrivateRoutes:', currentUser);

    const isAuthenticated = Boolean(currentUser && currentUser.token);

    console.log(`Navigating to ${isAuthenticated}`)
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// return (
//     currentUser  ? <Outlet/> : <Navigate to='/'/>
//   )
}

export default PrivateRoutes;

