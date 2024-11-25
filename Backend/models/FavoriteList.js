import mongoose from 'mongoose';

const FavoriteListSchema = new mongoose.Schema({
  list_id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Unique ID for the list
  user_email: { type: String, required: true }, // Email of the user who created the list
  list_name: { type: String, required: true }, // Name of the favorite list
});

const FavoriteList = mongoose.model('FavoriteList', FavoriteListSchema);

export default FavoriteList;
