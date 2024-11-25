import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import eye1 from '../assets/eye1.png'
import eye2 from '../assets/eye2.png'
import Validation from '../pages/util/LoginValidation';

function LoginForm({ redirectPath = '/' }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const togglePasswordVisibility = () => setShowPassword(!showPassword);

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

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    //if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: values.email,
          password: values.password,
        });        

        if (response.status === 200) {
          alert(response.data.message);
          localStorage.setItem('token', response.data.token);
          navigate(redirectPath); // Redirect after successful login
        }
      } catch (err) {
        alert(err.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    //}
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleInput}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="input-group password-container">
        <label htmlFor="password">Password</label>
        <div className='passImg'>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleInput}
        />
          <img src= {eye1} alt="Hide password" className="toggle-password" id="eye1" style={{ display: 'block' }} onClick={() => togglePasswordVisibility()} />
          <img src= {eye2} alt="Show password" className="toggle-password" id="eye2" style={{ display: 'none' }} onClick={() => togglePasswordVisibility()} />
          </div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <div className="register-link">
            Don't have an account? <span onClick={handleRegisterClick} style={{ color: '#f4c430', cursor: 'pointer' }}>Register</span>
      </div>
    </form>
    
  );
}

export default LoginForm;
