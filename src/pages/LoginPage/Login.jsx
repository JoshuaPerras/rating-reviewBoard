// src/pages/LoginPage/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './Login.css';

function LoginPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-form-card">
          <h2>Welcome!</h2>
          <h3>Sign in to your account</h3>
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label htmlFor="username">User name</label>
              <input type="text" id="username" placeholder="Enter your user name" style={{ color: '#333' }} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input type="password" id="password" placeholder="Enter your password" style={{ color: '#333' }} />
                <img src="/styles/eye1.png" alt="Hide password" className="toggle-password" id="eye1" style={{ display: 'block' }} onClick={() => togglePasswordVisibility()} />
                <img src="/styles/eye2.png" alt="Show password" className="toggle-password" id="eye2" style={{ display: 'none' }} onClick={() => togglePasswordVisibility()} />
              </div>
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="register-link">
            Don't have an account? <span onClick={handleRegisterClick} style={{ color: '#f4c430', cursor: 'pointer' }}>Register</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const eye1 = document.getElementById('eye1');
  const eye2 = document.getElementById('eye2');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eye1.style.display = 'none';
    eye2.style.display = 'block';
  } else {
    passwordInput.type = 'password';
    eye1.style.display = 'block';
    eye2.style.display = 'none';
  }
}

export default LoginPage;
