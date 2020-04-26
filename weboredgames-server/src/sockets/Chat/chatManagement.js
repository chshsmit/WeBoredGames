/**
* chatManagement.js
* @author Christopher Smith
* @description
* @created 2020-04-11T18:12:07.934Z-07:00
* @last-modified 2020-04-24T21:41:58.163Z-07:00
*/

// ----------------------------------------------------

const Room = require('../models/Room/Room');

// ----------------------------------------------------

const mainChatManagement = (socket, io) => {
  sendMessage(socket, io);
};


// ----------------------------------------------------

/**
 * Sending a message to the group
 *
 * @param {SocketIO.Socket} socket
 * @param {SocketIO.Server} io
*/

const sendMessage = (socket, io) => {
  socket.on('sendMessage', ({ message, name }, callback) => {
    Room.findOne({ "_users._id": socket.id })
      .exec()
      .then(room => {
        io.to(room._name).emit('message', { userId: socket.id, message, name });
        console.log("We are here")
        callback();
      });

  });
};


// ----------------------------------------------------


module.exports = {
  mainChatManagement
};
