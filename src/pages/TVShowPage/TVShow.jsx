import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import logo1 from "../../assets/logo1.png";
import "./TVShow.css";

function TvPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  // TMDB API Configurations
  const API_KEY = "27f59ca88a26a27a8e9e61a4536b0ad2";
  const BASE_URL = "https://api.themoviedb.org/3";

  // Fetch genres from TMDB
  const fetchGenres = async () => {
    const response = await fetch(
      `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    setGenres(data.genres);
  };

  // Fetch TV shows based on selected genres
  const fetchTV = async () => {
    setLoading(true);
    const genreParam =
      selectedGenres.length > 0
        ? `&with_genres=${selectedGenres.join(",")}`
        : "";
    const response = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${currentPage}${genreParam}`
    );
    const data = await response.json();
    setApiData(data.results);
    setLoading(false);
  };

  // Handle genre checkbox toggle
  const handleGenreChange = (genreId) => {
    setSelectedGenres(
      (prevSelected) =>
        prevSelected.includes(genreId)
          ? prevSelected.filter((id) => id !== genreId) // Remove genre if already selected
          : [...prevSelected, genreId] // Add genre if not selected
    );
    setCurrentPage(1); // Reset to the first page when genres change
  };

  // Fetch genres and initial TV shows on component mount
  useEffect(() => {
    fetchGenres();
    fetchTV();
  }, []);

  // Fetch TV shows whenever selectedGenres or currentPage changes
  useEffect(() => {
    fetchTV();
  }, [selectedGenres, currentPage]);

  // Fetch TV show details and navigate
  const viewDetails = async (tvId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();

      if (data.imdb_id) {
        navigate(`/movies/${data.imdb_id}`);
      } else {
        console.error("IMDb ID not found for the TV show.");
      }
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="load">
        <img src={logo1} alt="Logo1" />
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <Header var={currentPage} />
      <div className="container">
        <div className="filter-container">
          <h3>Filter by Genre</h3>
          <div className="genre-checkboxes">
            {genres.map((genre) => (
              <div key={genre.id} className="genre-checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={genre.id}
                    onChange={() => handleGenreChange(genre.id)}
                    checked={selectedGenres.includes(genre.id)}
                  />
                  {genre.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="main-content-mv">
          <h2>TV Shows</h2>
          <div className="tv-container">
            {apiData.map((tv) => (
              <div
                key={tv.id}
                className="tv-item"
                onClick={() => viewDetails(tv.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                  alt={tv.name}
                />
                <h3>{tv.name}</h3>
                <p>First Air Date: {tv.first_air_date}</p>
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

export default TvPage;
