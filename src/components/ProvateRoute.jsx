import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in
  const location = useLocation(); // Get the current location

  if (!isAuthenticated) {
    return (
      <Navigate to={`/login?redirect=${location.pathname}`} /> // Pass the redirect path
    );
  }

  return children;
}

export default PrivateRoute;
