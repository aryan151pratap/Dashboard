const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectMongo = require('./config/mongo');
const fetchRoutes = require('./routes/fetch');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectMongo();

app.use('/api/fetch', fetchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
