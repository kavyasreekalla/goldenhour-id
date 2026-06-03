require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// Routes
const emergencyRoutes = require('./routes/emergency');
app.use('/emergency', emergencyRoutes);

app.listen(PORT, () => {
  console.log(`GoldenHourID server running on port ${PORT}`);
});