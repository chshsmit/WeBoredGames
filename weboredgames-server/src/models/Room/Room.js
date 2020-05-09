/**
* RoomSchema.js
* @author Christopher Smith
* @description
* @created 2020-04-18T13:21:29.346Z-07:00
* @copyright
* @last-modified 2020-05-09T11:15:13.421Z-07:00
*/

// ----------------------------------------------------

const mongoose = require('mongoose');

// ----------------------------------------------------

const roomSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId()
  },
  _roomId: {
    type: String
  },
  _name: {
    type: String,
    required: true
  },
  _roomLeader:{
    type: Object,
    default: null
  },
  _users: {
    type: Array,
    default: []
  }
});


module.exports = mongoose.model('Room', roomSchema);
