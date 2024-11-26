// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MoviePage from './pages/MoviePage/Movie';
import TVShowPage from './pages/TVShowPage/TVShow';
import FavoritesPage from './pages/FavoritesPage/FavoritesList';
import ListDetailsPage from './pages/ListDetails/ListDetails';
import LoginPage from './pages/LoginPage/Login';
import RegisterPage from './pages/RegisterPage/SignUp';
import MovieDetail from './pages/MovieDetail/Detail';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/tvshows" element={<TVShowPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites/:id"
          element={
            <PrivateRoute>
              <ListDetailsPage />
            </PrivateRoute>
          }
        />

        {/* Dynamic Movie Details */}
        <Route path="/movies/:title" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
