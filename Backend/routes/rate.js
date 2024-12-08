import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRatings from '../models/Rating.js'; // UserRatings Model using Mongoose
import authenticate from '../middleware/authenticate.js';
import cors from 'cors';

const router = express.Router();

// Rate Route
router.post('/:title', authenticate ,async (req, res) => {
  const {title: movie_id} = req.params;
  const user_email = req.user.email; 
  const {rating} = req.body;

  console.log('Received rating for movie:', movie_id);
  console.log('Rating:', rating);
  console.log('User Email:', user_email);

  try {
    // Check if the user has already rated this movie
    const existingReview = await UserRatings.findOne({ user_email, movie_id });

    if (existingReview) {
      // If the review exists, update the rating
      existingReview.rating = rating;
      await existingReview.save();
      
    } else {
      // If no review exists, create a new rating entry
      const newRate = new UserRatings({ user_email, movie_id, rating });
      await newRate.save();
      
    }

    res.status(200).json({ message: 'Rated successfully'});
  } catch (err) {
    console.error('Error submitting rating:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/average-rating/:title', async (req, res) => {
  
  const {title} = req.body;

  console.log('Received movie title:', title);
  try {
    const averageResult = await UserRatings.aggregate([
      {
        $match: { movie_id: title },
      },
      {
        $group: {
          _id: null, 
          averageRating: { $avg: "$rating" }, 
          totalRating: { $sum: 1},
        },
      },
    ]);

    // Extract the averageRating from the aggregation result
    const average = averageResult.length > 0 && averageResult[0].averageRating !== null 
    ? averageResult[0].averageRating 
    : 0;
    
    const totalRating = averageResult.length > 0 && averageResult[0].totalRating !== null 
    ? averageResult[0].totalRating
    : 0;
    console.log('Average Rating:', average);
    console.log('Total Ratings:', totalRating);
    res.json({ title, average, totalRating });
  } catch (err) {
    console.error('Error calculating average rating', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
