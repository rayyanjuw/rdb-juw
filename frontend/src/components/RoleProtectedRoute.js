import React from 'react';
import { Navigate } from 'react-router-dom';
// import { allowedRoles } from '../config/role';

const RoleProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem('token'); 
  const userRole = localStorage.getItem('role'); 

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
};

export default RoleProtectedRoute;
