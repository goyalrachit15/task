// backend/src/server.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdb')
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});
