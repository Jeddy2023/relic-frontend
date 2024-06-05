import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProtectedRoute = ({ children }) => {
  const { accessToken, userData } = useContext(UserContext);
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (!accessToken && !isDashboardRoute && !isAdminRoute) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;