const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('email', EmailSchema); 