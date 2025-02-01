import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import faqRoutes from './routes/faqs.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});
redisClient.on('error', (err) => console.error('Redis Client Error', err));

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await redisClient.connect();
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