const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');


const app = express();



mongoose
  .connect('mongodb://127.0.0.1:27017/Podium-live')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.use(express.json());

// // Authentication Routes
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

app.use('/users', userRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(400);
    }
    res.json({ error: err.message });
  });
  
  // Unknown Path
  app.use((req, res) => {
    res.status(404).json({ error: 'Path Not Found' });
  });
  
module.exports = app;