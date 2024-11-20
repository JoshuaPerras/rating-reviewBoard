// src/pages/FavoritesPage/FavoritesPage.js
import React, { useState } from 'react';
import Header from '../../components/Header';
import './FavoritesList.css';


function FavoritesPage() {
    const [currentPage, setCurrentPage] = useState(1);
  
    const movies = [
      { title: 'Favorite Movie 1', imageUrl: 'https://via.placeholder.com/220x300' },
      { title: 'Favorite Movie 2', imageUrl: 'https://via.placeholder.com/220x300' },
      // More favorite movie items
    ];
  
    const removeFavorite = (title) => {
      alert(`Removed ${title} from favorites`);
    };
  
    const nextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const previousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    return (
      <div>
        <Header />
        <div className="favorites-container">
          <div className="movie-container">
            {movies.map((movie, index) => (
              <div key={index} className="movie-item">
                <img src={movie.imageUrl} alt="Favorite Movie Poster" />
                <h3>{movie.title}</h3>
                <button onClick={() => removeFavorite(movie.title)}>Remove from Favorites</button>
              </div>
            ))}
          </div>
  
          <div className="pagination">
            <span className="page-number">Page {currentPage}</span>
            <button onClick={previousPage} disabled={currentPage === 1}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default FavoritesPage;