import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import facultyRoutes from './routes/faculty.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/faculty', facultyRoutes);

// Root
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'FacultyGalaxy API running' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/faculty_galaxy';

mongoose.connect(MONGO_URI).then(() => {
  console.log('Mongo connected');
  app.listen(PORT, () => console.log('Server started on ' + PORT));
}).catch(err => {
  console.error('Mongo connection error', err);
  process.exit(1);
});
