import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; // For prop type validation

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const isAuthenticated = !!token; // Simple check for token existence
  const location = useLocation(); // Get current location details

  if (!isAuthenticated) {
    // Construct redirect path including query and hash
    const redirectPath = encodeURIComponent(location.pathname + location.search + location.hash);
    return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
  }

  // Render protected children if authenticated
  return children || <div>Unauthorized content</div>;
}

// Prop validation for better debugging
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
