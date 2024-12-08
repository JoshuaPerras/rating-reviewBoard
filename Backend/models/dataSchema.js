import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  list_id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Unique ID for the list
  user_email: { type: String, required: true }, // Email of the user who created the rating
  movie_id: { type: String, required: true }, // External Movie ID (e.g., from an API like TMDb)
});

const FavoriteList = mongoose.model('FavoriteList', FavoriteListSchema);

export default dataSchema;