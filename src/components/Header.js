// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo" onClick={() => window.location.href = '/'}>
        <img src="/styles/logo1.png" alt="Logo" style={{ width: '30px', height: 'auto', marginRight: '10px' }} />
        <span>MovieSite</span>
      </div>

      <nav className="nav-links">
        <div className="search-bar">
          <input type="text" placeholder="Search for movies..." />
          <button>Search</button>
        </div>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tvshows">TV Show</Link>
        <Link to="/favorites">Favorites List</Link>
      </nav>

      <div className="user-info">
        <img src="https://via.placeholder.com/40" alt="User Avatar" />
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
}

export default Header;
