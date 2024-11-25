import mongoose from 'mongoose';

const uri = "mongodb+srv://tungchihyuan:tung123@softe.8p9rm.mongodb.net/myDB?retryWrites=true&w=majority&appName=SoftE";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB using Mongoose');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
