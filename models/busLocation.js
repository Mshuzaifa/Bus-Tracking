const mongoose = require('mongoose');

const BusLocationSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BusLocation', BusLocationSchema);
