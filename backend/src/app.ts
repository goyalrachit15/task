import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config';
import authRoutes from './routes/auth';
import documentRoutes from './routes/routes';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: 'https://task-2-yl6f.onrender.com/',
  credentials: true, 
}));
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
