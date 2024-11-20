// src/pages/MovieDetail/Detail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import './Detail.css';

function MovieDetail() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const movieTitle = "3 Body Problem"; // 示例电影标题
  const movieDescription = "Across continents and decades, five brilliant friends make earth-shattering discoveries as the laws of science unravel and an existential threat emerges.";
  const starring = "Jess Hong, Liam Cunningham, Eiza González";
  const creators = "David Benioff, D.B. Weiss, Alexander Woo";

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(movieTitle));
  }, [movieTitle]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const newFavorites = favorites.filter((title) => title !== movieTitle);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
      alert(`${movieTitle} removed from favorites`);
    } else {
      favorites.push(movieTitle);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      alert(`${movieTitle} added to favorites`);
    }
  };

  return (
    <div>
      <Header />
      <div className="detail-container">
        <div className="poster">
          <img src="https://via.placeholder.com/250x350" alt={`${movieTitle} Poster`} />
        </div>
        <div className="movie-info">
          <h1>{movieTitle}</h1>
          <div className="details">
            <span>2024</span> | <span>TV-MA</span> | <span>1 Season</span> | <span>Sci-Fi</span>
          </div>
          <p className="description">{movieDescription}</p>
          <div className="info-group">
            <span>Starring:</span> {starring}
          </div>
          <div className="info-group">
            <span>Creators:</span> {creators}
          </div>
          <div className="favorite-button" onClick={toggleFavorite}>
            <span id="heart-icon">{isFavorite ? '♥' : '♡'}</span> {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
