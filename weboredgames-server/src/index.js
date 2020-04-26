/**
* index.js
* @author Christopher Smith
* @description
* @created 2020-04-11T10:50:30.991Z-07:00
* @last-modified 2020-04-26T15:23:36.988Z-07:00
*/

// ----------------------------------------------------

const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

const health = require('./routes/health');

const roomManagement = require('./sockets/Room/roomManagement');
const chatManagement = require('./sockets/Chat/chatManagement');
const codenamesEvents = require('./sockets/Codenames/codenamesEvents');
require('dotenv/config');


const PORT = process.env.PORT || 5000;

// ----------------------------------------------------

mongoose.connect(process.env.MONGO_DB_CONNECTION, { useNewUrlParser: true });

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// ----------------------------------------------------

io.on('connection', (socket) => {
  // Handling room/user management
  roomManagement.mainRoomManagement(socket, io);

  // Handling chats
  chatManagement.mainChatManagement(socket, io);

  // Handling codenames
  codenamesEvents.codenamesEvents(socket, io);
});


app.use(health);
app.use(cors);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
