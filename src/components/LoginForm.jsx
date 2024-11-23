import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from '../util/LoginValidation';

function LoginForm({ redirectPath }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          username: values.username,
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={values.username}
          onChange={handleInput}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <div className="input-group password-container">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleInput}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;
