import path  from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


import express from "express";
import cors from "cors";
import connectMongo from "./config/mongo.js";
import fetchRoutes from "./routes/fetch.js";


const app = express();

app.use(cors());
app.use(express.json());

connectMongo();

app.use("/api/fetch", fetchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
