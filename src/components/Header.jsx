import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo1 from '../assets/logo1.png';
import pfp from '../assets/popcornpfp.jpg';

function Header(props) {
  const [searchInput, setSearchInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleFavoritesClick = () => {
    if (isAuthenticated) {
      navigate('/favorites');
    } else {
      setShowModal(true); // Show the modal
    }
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
    navigate('/login?redirect=/favorites'); // Redirect to login page
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={logo1} alt="Logo" />
        <span>ReelMovies</span>
      </div>

      <div className="spaceFill"></div>
      <div className="right">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/tvshows">TV Show</Link>
          <span onClick={handleFavoritesClick} className="favorites-link">
            Favorites List
          </span>
        </nav>

        <div className="user-info">
          <img src={pfp} alt="User Avatar" />
          {!isAuthenticated ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <span
              onClick={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate('/');
              }}
              style={{ cursor: 'pointer', color: '#f4c430' }}
            >
              Logout
            </span>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <p>Please log in to create your personalized watch list!</p>
            <button className="modal-button" onClick={handleModalClose}>
              Login Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
