const mongoose = require('mongoose');
const validator = require('validator');

const { Message } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isURL(email),
      message: Message.BAD_URL,
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
