import express from 'express';
import FavoriteList from '../models/FavoriteList.js';
import FavoriteMovie from '../models/FavoriteMovie.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Get all favorite lists for the logged-in user
router.get('/favorite-lists', authenticate, async (req, res) => {
  try {
    const userEmail = req.user.email; // `authenticate` middleware attaches user info
    const lists = await FavoriteList.find({ user_email: userEmail });

    if (lists.length === 0) {
      return res.status(200).json({
        message: 'No favorite lists found. Create your personalized watch list now!',
        lists: [],
      });
    }

    res.status(200).json({ lists });
  } catch (err) {
    console.error('Error fetching favorite lists:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new favorite list
router.post('/favorite-lists', authenticate, async (req, res) => {
  try {
    const { name } = req.body; // Get the list name from the request body
    const user_email = req.user.email; // Ensure `user_email` comes from authenticated user

    console.log('User Email:', user_email); // Add this for debugging

    if (!name) {
      return res.status(400).json({ message: 'List name is required' });
    }

    // Create a new favorite list
    const newList = new FavoriteList({
      user_email,
      list_name: name,
    });

    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (err) {
    console.error('Error creating favorite list:', err.message);
    res.status(500).json({ message: 'Failed to create favorite list' });
  }
});

// Delete a favorite list
router.delete('/favorite-lists/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const list = await FavoriteList.findByIdAndDelete(id);
    await FavoriteMovie.deleteMany({ list_id: id });

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.status(200).json({ message: 'List deleted successfully' });
  } catch (err) {
    console.error('Error deleting favorite list:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get list details by list ID
router.get('/list-details/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const user_email = req.user.email;

    // Validate if the list exists and belongs to the user
    const list = await FavoriteList.findById(id);

    if (!list) {
      return res.status(404).json({ message: 'List not found or does not belong to the user.' });
    }

    res.status(200).json({
      list_name: list.list_name,
    });
  } catch (err) {
    console.error('Error fetching list details:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
