const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SuggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: Number, // Use 'Number' instead of 'number'
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model('Suggestion', SuggestionSchema);
