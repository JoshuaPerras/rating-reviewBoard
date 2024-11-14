// src/pages/MoviePage/Movie.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import './Movie.css';

function MoviePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const movies = [
    { title: 'Movie Title 1', imageUrl: 'https://via.placeholder.com/200x300' },
    { title: 'Movie Title 2', imageUrl: 'https://via.placeholder.com/200x300' },
    { title: 'Movie Title 3', imageUrl: 'https://via.placeholder.com/200x300' },
    { title: 'Movie Title 4', imageUrl: 'https://via.placeholder.com/200x300' },
    { title: 'Movie Title 5', imageUrl: 'https://via.placeholder.com/200x300' },
    { title: 'Movie Title 6', imageUrl: 'https://via.placeholder.com/200x300' },
    { title: 'Movie Title 7', imageUrl: 'https://via.placeholder.com/200x300' },
    { title: 'Movie Title 8', imageUrl: 'https://via.placeholder.com/200x300' },
  ];

  const viewDetails = (index) => {
    navigate(`/movies/${index}`);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <Filter />
        <div className="main-content">
          <div className="movie-container">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="movie-item"
                onClick={() => viewDetails(index)}
              >
                <img src={movie.imageUrl} alt="Movie Poster" />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pagination">
        <span className="page-number">Page {currentPage}</span>
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default MoviePage;
