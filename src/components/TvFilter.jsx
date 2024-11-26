"use client";

import React, { useState, useEffect } from "react";

const TvFilter = ({ onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    // Replace with your TMDb API call
    fetch(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=27f59ca88a26a27a8e9e61a4536b0ad2"
    )
      .then((response) => response.json())
      .then((data) => setGenres(data.genres || []))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  const handleCheckboxChange = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    setSelectedGenres(updatedGenres);
    onGenreChange(updatedGenres); // Notify parent component
  };

  return (
    <div>
      <h3>Filter by Genre</h3>
      {genres.map((genre) => (
        <div key={genre.id}>
          <label>
            <input
              type="checkbox"
              value={genre.id}
              onChange={() => handleCheckboxChange(genre.id)}
            />
            {genre.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TvFilter;
