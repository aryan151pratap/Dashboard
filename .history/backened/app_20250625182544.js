import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectMongo from './config/mongo.js';
import fetchClusterRoute  from './routes/fetch.js';
import fetchCollectionRoute from "./routes/fetch_col.js";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
console.log(FRONTEND_URL);

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV === 'development') return callback(null, true);
    if (origin === FRONTEND_URL) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());

connectMongo();

app.use('/api/fetch', fetchClusterRoute );
app.use("/api/collection", fetchCollectionRoute);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
