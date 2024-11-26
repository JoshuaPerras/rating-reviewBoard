import mongoose from 'mongoose';

const FavoriteMovieSchema = new mongoose.Schema({
  list_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'FavoriteList' },
  movie_id: { type: String, required: true }, // External Movie ID (e.g., from an API like TMDb)
  movie_name: {type: String, required: true},
  poster_uri: {type: String, required: true},
});

const FavoriteMovie = mongoose.model('FavoriteMovie', FavoriteMovieSchema);

export default FavoriteMovie;
