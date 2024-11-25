import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import axios from 'axios';
import './ListDetails.css';

function ListDetailsPage() {
  const { id } = useParams(); // Get the list ID from the URL
  const navigate = useNavigate();
  const [listName, setListName] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in to view this list.');
          navigate('/login'); // Redirect if not authenticated
          return;
        }
    
        // Fetch list details and associated movies by list_id
        const response = await axios.get(`http://localhost:5000/api/favorite/list-details/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setListName(response.data.list_name); // Set the list name
        setMovies(response.data.movies); // Set associated movies
      } catch (err) {
        console.error('Error fetching list details:', err.message);
        setError('Failed to load list details.');
      }
    };

    fetchListDetails();
  }, [id, navigate]);

  return (
    <div>
      <Header />
      <div className="list-details-container">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <h1>List: {listName}</h1>
            {movies.length > 0 ? (
              <ul className="movie-list">
                {movies.map((movie) => (
                  <li key={movie.movie_id}>
                    <h3>Movie ID: {movie.movie_id}</h3>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No movies added to this list yet.</p>
            )}
            <button onClick={() => navigate('/favorites')} className="back-button">
              Back to Favorites
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ListDetailsPage;
