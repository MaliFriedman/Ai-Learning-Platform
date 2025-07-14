import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
