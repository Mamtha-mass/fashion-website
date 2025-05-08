// config/db.js

const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' }); // Adjust the path if your .env file is located elsewhere

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mamtha', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB database.');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
