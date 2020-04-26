/**
* UserSchema.js
* @author Christopher Smith
* @description Main user schema for the application
* @created 2020-04-18T13:26:37.972Z-07:00
* @last-modified 2020-04-18T13:28:50.310Z-07:00
*/

// ----------------------------------------------------

const mongoose = require('mongoose');

// ----------------------------------------------------

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  _room: {
    type: String,
    required: true
  },
  _name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
