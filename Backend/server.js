import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import auth from './routes/auth.js';
import favorite from './routes/favorite.js';
import rate from './routes/rate.js';
import FavoriteMovie from './models/FavoriteMovie.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const uri = "mongodb+srv://tungchihyuan:tung123@softe.8p9rm.mongodb.net/?retryWrites=true&w=majority&appName=SoftE";


// Middleware
app.use(express.json());
app.use(cors());

// Database Connection and Server Start
(async () => {
  try {
    // Connect to MongoDB using Mongoose
    const mongoURI = uri || 'mongodb://localhost:27017/myDB'; // Replace `myDB` with your actual database name
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Routes
    app.use('/api/auth', auth);
    app.use('/api/favorite', favorite);
    app.use('/api/favoritemovie', FavoriteMovie);
    app.use('/api/rate', rate);

    // Fallback Route for Undefined Endpoints
    app.use((req, res) => {
      res.status(404).json({ message: 'API endpoint not found' });
    });

    // Start the Server
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1); // Exit process with failure
  }
})();

