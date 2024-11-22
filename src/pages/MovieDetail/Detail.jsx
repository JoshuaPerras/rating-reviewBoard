// src/pages/MovieDetail/Detail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import logo1 from '../../assets/logo1.png'
import './Detail.css';


function MovieDetail() {
  const { title } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieData = async () =>{
    // fetching videos Data
    await fetch(`https://www.omdbapi.com/?i=${title}&apikey=5553db97`)
    .then(res=>res.json())
    .then(data => {setApiData(data), setLoading(false)});
}

useEffect(()=>{
  setLoading(true);
  fetchMovieData();

},[])


  useEffect(() => {
    setTimeout (() => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsFavorite(favorites.includes(apiData.Title));
    }, 1000)
  
  }, [isFavorite]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const newFavorites = favorites.filter((title) => title !== apiData.Title);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
      alert(`${apiData.Title} removed from favorites`);
    } else {
      favorites.push(apiData.Title);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      alert(`${apiData.Title} added to favorites`);
    }
  };

  if (loading) {
    return(
      <div className='load'>
      <img src={logo1} alt="Logo1" />
      <h2>Loading...</h2>
    </div>
    )
  } 
  return (
    <div>
      <Header />
      <div className="detail-container">
        <div className="poster">
          <img src= {apiData.Poster} alt={`${apiData.Title} Poster`} />
        </div>
        <div className="movie-info">
          <h1>{apiData.Title}</h1>
          <div className="details">
            <span>{apiData.Year}</span> | <span>{apiData.Rated}</span> | <span>{apiData.Runtime}</span> | <span>{apiData.Genre}</span>
          </div>
          <p className="description"><p className='head'>Plot: </p>{apiData.Plot}</p>
          <div className="info-group">
            <span>Starring:</span> {apiData.Actors}
          </div>
          <div className="info-group">
            <span>Director:</span> {apiData.Director}
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
