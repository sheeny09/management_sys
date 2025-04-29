const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

// Check if MONGO_URL is defined
if (!MONGO_URI) {
  console.error('MONGO_URL is not defined in environment variables');
  process.exit(1); // Exit with error
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit with error
  });
