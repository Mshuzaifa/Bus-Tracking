// models/studentLocation.model.js

const mongoose = require('mongoose');

const StudentLocationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
  },
  { 
    timestamps: true 
  }
);

module.exports = mongoose.model('StudentLocation', StudentLocationSchema);
