/**
* UserSchema.js
* @author Christopher Smith
* @description Main user schema for the application
* @created 2020-04-18T13:26:37.972Z-07:00
* @last-modified 2020-04-29T17:32:49.968Z-07:00
*/

// ----------------------------------------------------

const mongoose = require('mongoose');

// ----------------------------------------------------

const ThirdPartyProviderSchema = new mongoose.Schema({
  provider_name: {
    type: String,
    default: null
  },
  provider_id: {
    type: String,
    default: null
  },
  provider_data: {
    type: {},
    default: null
  }
});


// ----------------------------------------------------

const UserSchema = new mongoose.Schema({
  _room: {
    type: String
  },
  _name: {
    type: String
  },
  _email: {
    type: String,
    required: true,
    unique: true
  },
  _emailIsVerified: {
    type: Boolean,
    default: false
  },
  _password: {
    type: String
  },
  _referralCode: {
    type: String,
    default: function() {
      let hash = 0;
      for (let i = 0; i < this._email.length; i++) {
        hash = this._email.charCodeAt(i) + ((hash << 5) - hash);
      }
      let res = (hash & 0x00ffffff).toString(16).toUpperCase();
      return "00000".substring(0, 6 - res.length) + res;
    }
  },
  _referredBy: {
    type: String,
    default: null
  },
  _thirdPartyAuth: [ThirdPartyProviderSchema],
  date: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = mongoose.model('users', UserSchema);
