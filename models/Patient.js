const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  encryptedData: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', patientSchema);