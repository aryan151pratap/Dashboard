import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectMongo from './config/mongo.js';
import fetchRoutes from './routes/fetch.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
console.log(FRONTEND_URL);

const app = express();

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

connectMongo();

app.use('/api/fetch', fetchRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
