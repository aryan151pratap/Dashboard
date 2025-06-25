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

const app = express();

app.use(cors());
app.use(express.json());

connectMongo();

app.use('/api/fetch', fetchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
