/**
* roomManagement.js
* @author Christopher Smith
* @description Main Room Management Functions
* @created 2020-04-11T11:00:55.089Z-07:00
* @last-modified 2020-04-26T19:18:47.923Z-07:00
*/

// ----------------------------------------------------

const Room = require('../../models/Room/Room');
const User = require('../../models/User/User');
const gameInstances = require('../../models/allGames');

// ----------------------------------------------------

/**
 * Main Room management function to handle users and rooms
 *
 * @param {SocketIO.Socket} socket The users socket that they are accessing
*/

const mainRoomManagement = (socket, io) => {
  // Function for creating a new room
  createNewRoom(socket);

  // Joining a room
  joinRoom(socket);

  // Setting the active room in a game
  setActiveGame(socket);

  // Disconnecting from a room
  disconnectFromRoom(socket, io);
};


// ----------------------------------------------------

/**
 * Adding a new user to a room
 *
 * @param {SocketIO.Socket} socket The socket the user is connected to
*/

const createNewRoom = (socket) => {


  socket.on('createRoom', ({ name, room }, callback) => {

    console.log(`SOCKET JOINING ${socket.id}`);

    // Determine if the room already exists
    Room.find()
      .where('_name').equals(room)
      .exec()
      .then(result => {
        if(result.length !== 0) return callback({ error: "That room name is already taken." });
        const user = new User({
          _name: name,
          _room: room,
          _id: socket.id
        });

        const newRoom = new Room({
          _name: room,
          _roomLeader: {
            leaderId: socket.id,
            leaderName: name
          },
          _users: [user]
        });
        newRoom.save()
          .then(result => {
            socket.join(room);
            callback({ newRoom: result, id: socket.id });
          });
      });
  });

};

// ----------------------------------------------------

/**
 * Joining an already existing room
 *
 * @param {SocketIO.Socket} socket The new users socket
 * @param {SocketIO.Server} io The current socket io server
*/

const joinRoom = (socket) => {

  socket.on("joinRoom", ({ name, room }, callback) => {

    console.log(`SOCKET JOINING ${socket.id}`);

    Room.findOne()
      .where('_name').equals(room)
      .exec()
      .then(result => {
        if(!result) return callback({ error: "That room does not exist." });

        const user = new User({
          _name: name,
          _room: room,
          _id: socket.id
        });

        const userExists = result._users.find((user) => user._name === name);
        if(userExists) return callback({error: "That username is already taken"});

        result._users.push(user);
        result.save()
          .then(result => {
            socket.join(room);
            socket.broadcast.to(room).emit('newRoomData', { roomData: result });
            callback({ roomData: result, userId: socket.id });
          });

      });
  });
};

// ----------------------------------------------------

const setActiveGame = (socket) => {
  socket.on("setNewGame", ({ gameName, room }, callback) => {

    Room.findOne()
      .where('_name').equals(room)
      .exec()
      .then(result => {
        if(!result) return callback({ error: "That room does not exist" });

        let gameInstance = gameInstances.getNewGameInstance(gameName, room);

        // result._activeGame = gameInstance;

        gameInstance.save()
          .then(result => {
            socket.broadcast.to(room).emit('newGameData', { activeGame: result });
            callback({ activeGame: result });
          });

      });
  });
};


// ----------------------------------------------------

/**
 * Removing a user from a room and deleteing the room if they were last
 * @param {SocketIO.Socket} socket The current socket the user is connected to
 * @param {SocketIO.Server} io The current socket io server
*/

const disconnectFromRoom = (socket, io) => {
  socket.on('disconnect', () => {

    console.log(`SOCKET DISCONNECTING: ${socket.id}`);

    Room.findOne({ "_users._id": socket.id})
      .exec()
      .then(result => {
        const index = result._users.findIndex((user) => user._id === socket.id);
        result._users.splice(index, 1)[0];
        if(socket.id === result._roomLeader.leaderId && result._users.length !== 0) {
          result._roomLeader = {
            leaderName: result._users[0]._name,
            leaderId: result._users[0]._id
          };
        }

        if(result._users.length !== 0) {
          result.save()
            .then(result => {
              io.to(result._name).emit('newRoomData', { roomData: result });
            });
        } else {
          result.remove();
        }

      });
  });
};


// ----------------------------------------------------

module.exports = {
  mainRoomManagement
};
