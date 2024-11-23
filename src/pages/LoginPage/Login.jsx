import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import LoginForm from '../../components/LoginForm';
import './Login.css';

function LoginPage() {
  const location = useLocation();

  // Extract the redirect path from the query parameters or default to "/"
  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-form-card">
          <h2>Welcome!</h2>
          <h3>Sign in to your account</h3>
          <LoginForm redirectPath={redirectPath} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
