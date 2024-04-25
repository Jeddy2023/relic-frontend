import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useContext(UserContext);

  if (!accessToken) {
    return <Navigate to={"/"} />
  }

  return children
};

export default ProtectedRoute;
