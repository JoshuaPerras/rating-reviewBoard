// src/pages/MovieDetail/Detail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import logo1 from '../../assets/logo1.png';
import './Detail.css';

function MovieDetail() {
  const { title } = useParams(); // IMDb ID from the URL
  const [isFavorite, setIsFavorite] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const BACKEND_API_URL = 'http://localhost:5000/api/favorite';

  // Fetch movie details from OMDb API
  const fetchMovieData = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${title}&apikey=5553db97`);
      const data = await response.json();
      setApiData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  useEffect(()=>{
    setLoading(true);
    fetchMovieData();
  
  },[])

  // Fetch favorite lists from the backend
  useEffect(() => {
    const fetchFavoriteLists = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_API_URL}/favorite-lists`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoriteLists(response.data.lists || []);
      } catch (error) {
        console.error('Error fetching favorite lists:', error);
      }
    };

    fetchFavoriteLists();
  }, []);

  // Check if the movie is already in a favorite list
  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BACKEND_API_URL}/check-favorite/${title}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    if (apiData) {
      checkIfFavorite();
    }
  }, [apiData]);

  // Handle toggle favorite (add/remove movie)
  const toggleFavorite = async () => {
    if (isFavorite) {
      // Remove movie from favorites
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BACKEND_API_URL}/remove-movie/${title}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(false);
        alert(`${apiData.Title} removed from favorites.`);
      } catch (error) {
        console.error('Error removing movie from favorites:', error);
      }
    } else {
      // Open modal to select lists for saving the movie
      setIsModalOpen(true);
    }
  };

  // Save movie to selected favorite lists
  const handleSaveToFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      await Promise.all(
        selectedLists.map((listId) =>
          axios.post(
            `${BACKEND_API_URL}/add-movie`,
            { list_id: listId, movie_id: title },
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      alert(`${apiData.Title} added to selected lists.`);
      setIsFavorite(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving movie to favorites:', error);
      alert('Failed to save movie. Please try again.');
    }
  };

  const handleCheckboxChange = (listId) => {
    setSelectedLists((prev) =>
      prev.includes(listId) ? prev.filter((id) => id !== listId) : [...prev, listId]
    );
  };

  if (loading) {
    return (
      <div className="load">
        <img src={logo1} alt="Logo" />
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="detail-container">
        <div className="poster">
          <img src={apiData.Poster} alt={`${apiData.Title} Poster`} />
        </div>
        <div className="movie-info">
          <h1>{apiData.Title}</h1>
          <div className="details">
            <span>{apiData.Year}</span> | <span>{apiData.Rated}</span> | <span>{apiData.Runtime}</span> |{' '}
            <span>{apiData.Genre}</span>
          </div>
          <p className="description">
            <p className="head">Plot:</p>
            {apiData.Plot}
          </p>
          <div className="info-group">
            <span>Starring:</span> {apiData.Actors}
          </div>
          <div className="info-group">
            <span>Director:</span> {apiData.Director}
          </div>
          <div className="favorite-button" onClick={toggleFavorite}>
            <span id="heart-icon">{isFavorite ? '♥' : '♡'}</span>{' '}
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </div>
        </div>
      </div>

      {/* Modal for Favorite List Selection */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <modal-title>Select Favorite Lists</modal-title>
            {favoriteLists.length > 0 ? (
              favoriteLists.map((list) => (
                <div key={list._id}>
                  <input
                    type="checkbox"
                    id={list._id}
                    value={list._id}
                    onChange={() => handleCheckboxChange(list._id)}
                  />
                  <label htmlFor={list._id}>{list.list_name}</label>
                </div>
              ))
            ) : (
              <p>No favorite lists available. Create one in the Favorites page.</p>
            )}
            <button onClick={handleSaveToFavorites} className="save-button">
              Save
            </button>
            <button onClick={() => setIsModalOpen(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
