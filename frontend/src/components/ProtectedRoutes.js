import React from 'react';

import { Navigate, Outlet } from 'react-router-dom'
// import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
const PrivateRoutes = () => {
    const { currentUser } = useAuth();

    const isAuthenticated = Boolean(currentUser && currentUser.token);
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;

}

export default PrivateRoutes;

