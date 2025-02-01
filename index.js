import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import faqRoutes from './routes/faqs.js';
import redisClient from './redisClient.js';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    console.log('Connected to Redis');

    app.use('/api/faqs', faqRoutes);

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to server:', error);
    process.exit(1);
  }
};

startServer();