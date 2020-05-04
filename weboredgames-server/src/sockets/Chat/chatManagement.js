/**
* chatManagement.js
* @author Christopher Smith
* @description
* @created 2020-04-11T18:12:07.934Z-07:00
* @last-modified 2020-05-04T16:18:02.393Z-07:00
*/

// ----------------------------------------------------

const Room = require('../../models/Room/Room');

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
  socket.on('sendMessage', ({ message, name, userId }, callback) => {
    Room.findOne({ "_users._id": userId })
      .exec()
      .then(room => {
        io.to(room._name).emit('message', { userId, message, name });
        callback();
      });

  });
};


// ----------------------------------------------------


module.exports = {
  mainChatManagement
};
