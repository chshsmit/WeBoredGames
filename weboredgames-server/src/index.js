/**
* index.js
* @author Christopher Smith
* @description
* @created 2020-04-11T10:50:30.991Z-07:00
* @last-modified 2020-05-09T12:37:03.626Z-07:00
*/

// ----------------------------------------------------

require('dotenv/config');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('./passport/setup');

const auth = require('./routes/auth');
const health = require('./routes/health');
const roomData = require('./routes/roomData');

const roomManagement = require('./sockets/Room/roomManagement');
const chatManagement = require('./sockets/Chat/chatManagement');
const codenamesEvents = require('./sockets/Codenames/codenamesEvents');


const PORT = process.env.PORT || 5000;

// ----------------------------------------------------

mongoose.connect(process.env.MONGO_DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to mongoDB");
});

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// ----------------------------------------------------
// Middlewares
// ----------------------------------------------------

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(allowCrossDomain);

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());


// Routes
app.use("/api/auth", auth);
app.use(health);
app.use(roomData);

// Cors
app.use(cors);


// ----------------------------------------------------
// Socket management
// ----------------------------------------------------

io.on('connection', (socket) => {
  // Handling room/user management
  roomManagement.mainRoomManagement(socket, io);

  // Handling chats
  chatManagement.mainChatManagement(socket, io);

  // Handling codenames
  codenamesEvents.codenamesEvents(socket, io);
});


// ----------------------------------------------------
// Socket management
// ----------------------------------------------------



server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
