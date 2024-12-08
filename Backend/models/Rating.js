import mongoose from 'mongoose';

const RatingsSchema = new mongoose.Schema({
  user_email: { type: String, required: true }, // Email of the user who created the rating
 // rating_value: { type: , required: true }, // Name of the favorite list
  movie_id: { type: String, required: true }, // External Movie ID (e.g., from an API like TMDb)
  rating: { type: Number, required: true }, // Rating by User for a Movie ID (e.g., from an API like TMDb)
});

export default mongoose.model('UserRatings', RatingsSchema);