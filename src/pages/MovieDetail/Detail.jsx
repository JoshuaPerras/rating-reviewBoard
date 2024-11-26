// src/pages/MovieDetail/Detail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import logo1 from '../../assets/logo1.png';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
  const FAVORITEMOVIE_API_URI = 'http://localhost:5000/api/favoriteMovie';

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
        const response = await axios.get(`${FAVORITEMOVIE_API_URI}/check-favorite/${title}`, {
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
        await axios.delete(`${FAVORITEMOVIE_API_URI}/remove-movie/${title}`, {
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
            `${FAVORITEMOVIE_API_URI}/add-movie`,
            { list_id: listId, movie_id: title, movie_name: apiData.Title,  poster_uri: apiData.Poster},
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      alert(`${apiData.Title} added to selected lists.`);
      setIsFavorite(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving movie to favorites:', error);
      alert('Movie already exists in the list.');
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
          <p className='head'>Plot: </p>
          <div className="description"> {apiData.Plot}</div>
          <div className="info-group">
            <span>Starring:</span> {apiData.Actors}
          </div>
          {apiData.Director == "N/A"? <></>:<div className="info-group">
            <span>Director:</span> {apiData.Director}
          </div>}
          {apiData.BoxOffice == "N/A"? <></>:<div className="info-group">
            <span>BoxOffice Earnings:</span> {apiData.BoxOffice}
          </div>}
          
          <div className='circleRating'>
            {apiData.Metascore == "N/A"? <></>:<div className='MetaScore'>
            <h2 style={{color: `#f4c430`}}>MetaScore</h2>
            <CircularProgressbar value={apiData.Metascore} text={`${apiData.Metascore}%`} styles={buildStyles({
             pathTransitionDuration: 1,
              pathColor: `rgba(${255 * (1 - apiData.Metascore/100) + 20}, ${255 * apiData.Metascore/100}, 0)`,
              textColor: `rgba(${255 * (1 - apiData.Metascore/100) + 20}, ${255 * apiData.Metascore/100}, 0)`
            })} />
          </div>}
          {apiData.imdbRating == "N/A"? <></>: <div className='IMDBScore'>
          <h2 style={{color: `#f4c430`}}>IMDB Rating</h2>

          <CircularProgressbar value={apiData.imdbRating*10} text={`${apiData.imdbRating*10}%`} styles={buildStyles({
            pathTransitionDuration: 1,
            pathColor: `rgba(${255 * (1 - (apiData.imdbRating/10)) + 20}, ${255 * apiData.imdbRating/10}, 0)`,
            textColor: `rgba(${255 * (1 - (apiData.imdbRating/10)) + 20}, ${255 * apiData.imdbRating/10}, 0)`
          })} />
          </div>}
          
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
      <h3 className="modal-title">Select Favorite Lists</h3> {/* Updated title styling */}
      <div className="modal-lists-container">
        {favoriteLists.length > 0 ? (
          favoriteLists.map((list) => (
            <div key={list._id} className="modal-list-item">
              <input
                type="checkbox"
                id={list._id}
                value={list._id}
                onChange={() => handleCheckboxChange(list._id)}
              />
              <label htmlFor={list._id} className="modal-list-label">
                🌟 {`List: ${list.list_name.toUpperCase()}`}
              </label>
            </div>
          ))
        ) : (
          <p className="modal-text">No favorite lists available. Create one in the Favorites page.</p>
        )}
      </div>
      <div className="modal-buttons-container">
        <button onClick={handleSaveToFavorites} className="modal-button save-button">
          Save
        </button>
        <button onClick={() => setIsModalOpen(false)} className="modal-button cancel-button">
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default MovieDetail;
