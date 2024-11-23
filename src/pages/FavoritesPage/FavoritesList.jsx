import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './FavoritesList.css';

function FavoritesPage() {
  const navigate = useNavigate(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([
    { title: 'Favorite Movie 1', imageUrl: 'https://via.placeholder.com/220x300' },
    { title: 'Favorite Movie 2', imageUrl: 'https://via.placeholder.com/220x300' },
    // Add more movie objects as needed
  ]);
  const [lists, setLists] = useState([
    { id: 1, name: 'My Favorite Movies' },
    { id: 2, name: 'Sci-Fi Movies' },
    { id: 3, name: 'Comedy Collection' },
  ]);

  // Remove a movie from favorites
  const removeFavorite = (title) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.title !== title));
    alert(`Removed ${title} from favorites`);
  };

  // Pagination logic
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Create a new favorite list
  const handleCreateList = () => {
    const listName = prompt('Enter a name for the new list:');
    if (!listName) return;

    const newList = {
      id: lists.length + 1, // Assign a unique ID
      name: listName,
    };

    setLists([...lists, newList]);
  };

  return (
    <div>
      <Header />
      <div className="favorites-container">
        <h1>Your Favorites</h1>

        {/* Create List Button */}
        <button className="create-list-button" onClick={handleCreateList}>
          Create List
        </button>

        {/* Render Favorite Lists */}
        <div className="lists">
          {lists.map((list) => (
            <div
              key={list.id}
              className="list-item"
              onClick={() => navigate(`/favorites/${list.id}`)} // Navigate to ListDetailsPage
            >
              <h3>{list.name}</h3>
            </div>
          ))}
        </div>

        {/* Render Movies */}
        <div className="movie-container">
          {movies.map((movie, index) => (
            <div key={index} className="movie-item">
              <img src={movie.imageUrl} alt="Favorite Movie Poster" />
              <h3>{movie.title}</h3>
              <button onClick={() => removeFavorite(movie.title)}>Remove from Favorites</button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <span className="page-number">Page {currentPage}</span>
          <button onClick={previousPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={nextPage}>Next Page</button>
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;
