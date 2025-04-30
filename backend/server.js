// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;
console.log('MONGODB_URI from server.js:', process.env.MONGODB_URI);
connectDB();

app.use(cors({ origin: 'https://management-sys-frontend.onrender.com' })); // Allow requests from localhost:3000
app.use(express.json());

app.use('/students', studentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
