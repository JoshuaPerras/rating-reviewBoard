import express from 'express';
import authenticate from '../middleware/authenticate.js';
import FavoriteMovie from '../models/FavoriteMovie.js';

const router = express.Router();

// Add a movie to a favorite list
router.post('/add-movie', authenticate, async (req, res) => {
    const { list_id, movie_id, movie_name, poster_uri } = req.body;
  
    try {
      if (!list_id || !movie_id) {
        return res.status(400).json({ message: 'List ID and Movie ID are required.' });
      }
  
      // Check if the movie already exists in the list
      const existingMovie = await FavoriteMovie.findOne({ list_id, movie_id });
      if (existingMovie) {
        return res.status(400).json({ message: 'Movie already exists in the list.' });
      }
  
      const newFavoriteMovie = new FavoriteMovie({ list_id, movie_id,  movie_name, poster_uri});
      await newFavoriteMovie.save();
  
      res.status(201).json({ message: 'Movie added to favorite list successfully.' });
    } catch (err) {
      console.error('Error adding movie to favorite list:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
// Get all movies in a specific favorite list
router.get('/:listId', authenticate, async (req, res) => {
  try {
    const { listId } = req.params;

    const movies = await FavoriteMovie.find({ list_id: listId });
    res.status(200).json({ movies });
  } catch (err) {
    console.error('Error fetching movies for list:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove a movie from a favorite list
router.delete('/:listId/:movieId', authenticate, async (req, res) => {
  try {
    const { listId, movieId } = req.params;

    const deletedMovie = await FavoriteMovie.findOneAndDelete({
      list_id: listId,
      movie_id: movieId,
    });

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found in the list.' });
    }

    res.status(200).json({ message: 'Movie removed successfully.' });
  } catch (err) {
    console.error('Error removing movie from list:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;


export default router;
