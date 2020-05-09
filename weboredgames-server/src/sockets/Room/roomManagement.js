/**
* roomManagement.js
* @author Christopher Smith
* @description Main Room Management Functions
* @created 2020-04-11T11:00:55.089Z-07:00
* @last-modified 2020-05-09T12:54:16.856Z-07:00
*/

// ----------------------------------------------------

const Room = require('../../models/Room/Room');
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


  socket.on('createRoom', ({ userData, room, roomId }, callback) => {

    console.log(`SOCKET JOINING: ${socket.id}`);
    console.log(`PLAYER JOINING: ${userData._id}`);
    socket.playerId = userData._id;

    console.log(roomId);

    // Determine if the room already exists
    Room.find()
      .where('_name').equals(room)
      .exec()
      .then(result => {
        if(result.length !== 0) return callback({ error: "That room name is already taken." });

        const newRoom = new Room({
          _name: room,
          _roomLeader: {
            leaderId: userData._id,
            leaderName: userData._name
          },
          _users: [userData],
          _roomId: roomId
        });
        newRoom.save()
          .then(result => {
            socket.join(room);
            callback({ newRoom: result });
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

  socket.on("joinRoom", ({ userData, room, roomId }, callback) => {

    console.log(`SOCKET JOINING: ${socket.id}`);
    console.log(`PLAYER JOINING: ${userData._id}`);
    socket.playerId = userData._id;


    console.log(roomId);


    Room.findOne()
      .where('_name').equals(room)
      .exec()
      .then(result => {
        if(!result) return callback({ error: "That room does not exist." });

        result._users.push(userData);
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
    console.log(`PLAYER DISCONNECTING: ${socket.playerId}`);

    Room.findOne({ "_users._id": socket.playerId})
      .exec()
      .then(result => {
        const index = result._users.findIndex((user) => user._id === socket.playerId);
        result._users.splice(index, 1)[0];
        if(socket.playerId === result._roomLeader.leaderId && result._users.length !== 0) {
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
