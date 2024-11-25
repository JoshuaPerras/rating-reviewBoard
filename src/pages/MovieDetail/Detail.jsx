// src/pages/MovieDetail/Detail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import logo1 from '../../assets/logo1.png';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Detail.css';


function MovieDetail() {
  const { title } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const percentage = 66;

  const fetchMovieData = async () =>{
    // fetching videos Data
    await fetch(`https://www.omdbapi.com/?i=${title}&apikey=5553db97`)
    .then(res=>res.json())
    .then(data => {setApiData(data), setLoading(false)});
    
}

const getColors = async () => {
    
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
            <span id="heart-icon">{isFavorite ? '♥' : '♡'}</span> {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
