const mongoose = require('mongoose');

const userScheme = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      minlength: 4
    },
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 25
    },
    password: {
      type: String,
      required: true
    },
    registerDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    collection: 'user'
  }
);

const User = mongoose.model('User', userScheme);

module.exports = User;
