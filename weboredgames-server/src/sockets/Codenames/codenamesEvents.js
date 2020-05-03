/**
* codenamesEvents.js
* @author Christopher Smith
* @description Events specific to codenames
* @created 2020-04-16T12:35:07.655Z-07:00
* @last-modified 2020-05-03T11:51:01.901Z-07:00
*/

// ----------------------------------------------------

const Room = require('../../models/Room/Room');
const Codenames = require('../../models/Codenames/Codenames');
const gameInstances = require('../../models/allGames');

// ----------------------------------------------------

/**
 * Handling all events that have to do with codenames
 *
 * @param {SocketIO.Socket} socket
 * @param {SocketIO.Server} io
*/

const codenamesEvents = (socket, io) => {
  // Adding a member to a team
  addMemberToTeam(socket, io);

  // Confirming the teams and setting spymasters
  confirmTeams(socket, io);

  // Changing the current teams turn
  changeTeamsTurn(socket, io);

  // Spymaster is giving a clue
  giveClue(socket, io);

  // Spy is selecting a word
  wordSelected(socket, io);

  // Ending a game and returning to the home screen
  endGameAndReturnHome(socket, io);

  // Starting a new game of codenames when the game is over
  startANewGame(socket, io);
};

// ----------------------------------------------------

/**
 * Adding a user to their desired team
 *
 * @param {SocketIO.Socket} socket The socket that is emitting the event
*/

const addMemberToTeam = (socket, io) => {
  socket.on("codenamesJoinTeam", ({ wantedTeam, userId }, callback) => {

    Room.findOne({ "_users._id": userId })
      .exec()
      .then(result => {

        Codenames.findOne({"_roomName": result._name})
          .exec()
          .then(currentGame => {
            if (wantedTeam === 'blue') {
              const index = currentGame._redTeam.findIndex((player) => player === userId);
              if(index !== -1) currentGame._redTeam.splice(index, 1)[0];

              if(!currentGame._blueTeam.includes(userId)) currentGame._blueTeam.push(userId);
            } else {
              // First check if the player is already on the blue team
              const index = currentGame._blueTeam.findIndex((player) => player === userId);
              if(index !== -1) currentGame._blueTeam.splice(index, 1)[0];

              if(!currentGame._redTeam.includes(userId)) currentGame._redTeam.push(userId);
            }

            currentGame.save()
              .then(newGame => {
                io.to(newGame._roomName).emit('newGameData', { activeGame: newGame });
                callback();
              });
          });


      });
  });
};

// ----------------------------------------------------

/**
 * Confirming the teams for the room
 *
 * @param {SocketIO.Socket} socket The socket that is emitting the event
 * @param {SocketIO.Server} io
*/

const confirmTeams = (socket, io) => {
  socket.on("codenamesConfirmTeams", ({ spymasters, userId }, callback) => {

    Room.findOne({ "_users._id": userId })
      .exec()
      .then(result => {

        Codenames.findOne({"_roomName": result._name})
          .exec()
          .then(currentGame => {
            currentGame._spyMasterRed = spymasters.redSpymaster;
            currentGame._spyMasterBlue = spymasters.blueSpymaster;
            currentGame._teamsConfirmed = true;

            let redGuesser = "";
            while(redGuesser === "") {
              let redGuesserIndex = Math.floor(Math.random() * currentGame._redTeam.length);
              if(currentGame._redTeam[redGuesserIndex] !== spymasters.redSpymaster) redGuesser = currentGame._redTeam[redGuesserIndex];
            }

            let blueGuesser = "";
            while(blueGuesser === "") {
              let blueGuesserIndex = Math.floor(Math.random() * currentGame._blueTeam.length);
              if(currentGame._blueTeam[blueGuesserIndex] !== spymasters.blueSpymaster) blueGuesser = currentGame._blueTeam[blueGuesserIndex];
            }

            currentGame._designatedRedGuesser = redGuesser;
            currentGame._designatedBlueGuesser = blueGuesser;


            currentGame.save()
              .then(newGame => {
                io.to(newGame._roomName).emit('newGameData', { activeGame: newGame });
                callback();
              });
          });


      });
  });
};


// ----------------------------------------------------

/**
 * Changing the current teams turn
 *
 * @param {SocketIO.Socket} socket The current socket making the connection
 * @param {SocketIO.Server} io The current socket io server
*/

const changeTeamsTurn = (socket, io) => {
  socket.on("codenamesChangeTeamsTurn", ({ userId }) => {
    Room.findOne({ "_users._id": userId }).exec().then(result => {
      Codenames.findOne({"_roomName": result._name})
        .exec()
        .then(currentGame => {

          let redGuesser = "";
          while(redGuesser === "") {
            let redGuesserIndex = Math.floor(Math.random() * currentGame._redTeam.length);
            if(currentGame._redTeam[redGuesserIndex] !== currentGame._spyMasterRed) redGuesser = currentGame._redTeam[redGuesserIndex];
          }

          let blueGuesser = "";
          while(blueGuesser === "") {
            let blueGuesserIndex = Math.floor(Math.random() * currentGame._blueTeam.length);
            if(currentGame._blueTeam[blueGuesserIndex] !== currentGame._spyMasterBlue) blueGuesser = currentGame._blueTeam[blueGuesserIndex];
          }

          currentGame._designatedRedGuesser = redGuesser;
          currentGame._designatedBlueGuesser = blueGuesser;

          currentGame._currentTeamsTurn = currentGame._currentTeamsTurn === "Red" ? "Blue" : "Red";
          currentGame._currentClue = {
            wordCount: 0,
            clueWord: "",
            maximumGuesses: 0,
            currentGuesses: 0
          };

          currentGame.save()
            .then(newGame => {
              io.to(newGame._roomName).emit('newGameData', { activeGame: newGame });
            });
        });
    });
  });
};


// ----------------------------------------------------

/**
 * The spymaster is giving a clue
 *
 * @param {SocketIO.Socket} socket The current socket making the connection
 * @param {SocketIO.Server} io The current socket io server
*/

const giveClue = (socket, io) => {
  socket.on("codenamesGiveClue", ({ wordCount, clueWord, userId }, callback) => {
    Room.findOne({ "_users._id": userId }).exec().then(result => {
      Codenames.findOne({"_roomName": result._name})
        .exec()
        .then(currentGame => {
          currentGame._currentClue = {
            wordCount,
            clueWord,
            maximumGuesses: wordCount + 1,
            currentGuesses: 0
          };
          currentGame.save()
            .then(newGame => {
              io.to(newGame._roomName).emit('newGameData', { activeGame: newGame });
              callback();
            });
        });
    });
  });
};

// ----------------------------------------------------

/**
 * Spy is selecting a word
 *
 * @param {SocketIO.Socket} socket The current socket that is selecting a word
 * @param {SocketIO.Server} io The current socket io server
*/

const wordSelected = (socket, io) => {
  socket.on('codenamesSelectWord', ({ selectedWord, userId }) => {
    Room.findOne({ "_users._id": userId }).exec().then(result => {
      Codenames.findOne({"_roomName": result._name})
        .exec()
        .then(currentGame => {

          // Need to add the word to the selected word list to start
          currentGame._selectedWords.push(selectedWord.index);

          const wordsToCheck = currentGame._currentTeamsTurn === 'Red' ?
              currentGame._redWords : currentGame._blueWords;

          // Determine if the word selected was the assassin
          const wordIsAssassin = currentGame._assassin.index === selectedWord.index;

          // Determine if the word was a part of the current teams word list
          const isCurrentTeamsWord = currentGame._currentTeamsTurn === 'Red' ?
              currentGame._redWords.includes(selectedWord.index) :
              currentGame._blueWords.includes(selectedWord.index);

          if (isCurrentTeamsWord) {
            // Check if all of the words have been selected for the current team
            const allWordsChosen = wordsToCheck.every((wordIndex) => {
              return currentGame._selectedWords.includes(wordIndex);
            });

            // If all the words have been chosen then end the game and declare the current team the winner
            if(allWordsChosen) {
              currentGame._gameResults = {
                gameIsOver: true,
                gameWinner: currentGame._currentTeamsTurn
              };
            } else {
              // TODO: Figure out why this is not incrementing in the database
              // Increase number of guesses by one
              const currentGuesses = currentGame._currentClue.currentGuesses + 1;
              currentGame._currentClue = {
                wordCount: currentGame._currentClue.wordCount,
                clueWord: currentGame._currentClue.clueWord,
                maximumGuesses: currentGame._currentClue.maximumGuesses,
                currentGuesses
              };

              // Check if the new number of guesses is equal to the max guesses
              const reachedMaxGuesses = currentGuesses === currentGame._currentClue.maximumGuesses;

              // If equal, then reset currentclue and switch teams
              if(reachedMaxGuesses) {
                currentGame._currentTeamsTurn = currentGame._currentTeamsTurn === 'Red' ? 'Blue' : 'Red';
                currentGame._currentClue = {
                  wordCount: 0,
                  clueWord: "",
                  maximumGuesses: 0,
                  currentGuesses: 0
                };
              }
            }
          } else if(wordIsAssassin) {
            // End the game and declare the other team the winner
            const gameWinner = currentGame._currentTeamsTurn === "Red" ? "Blue" : "Red";
            currentGame._gameResults = {
              gameIsOver: true,
              gameWinner
            };

          } else {
            // Reset _currentClue and switch teams
            currentGame._currentTeamsTurn = currentGame._currentTeamsTurn === 'Red' ? 'Blue' : 'Red';
            currentGame._currentClue = {
              wordCount: 0,
              clueWord: "",
              maximumGuesses: 0,
              currentGuesses: 0
            };

          }

          // Save the game and emit new game data
          currentGame.save()
            .then(newGame => {
              io.to(newGame._roomName).emit('newGameData', { activeGame: newGame });
            });
        });
    });
  });
};

// ----------------------------------------------------

/**
 * Removing the current active game and returning to the homescreen
 *
 * @param {SocketIO.Socket} socket The socket that is emitting the event
 * @param {SocketIO.Server} io The current socket io server
*/

const endGameAndReturnHome = (socket, io) => {
  socket.on("codenamesReturnHome", ({ userId }) => {
    Room.findOne({ "_users._id": userId }).exec().then(result => {
      Codenames.findOne({"_roomName": result._name})
        .exec()
        .then(currentGame => {
          currentGame.remove().then(() => {
            io.to(result._name).emit('newGameData', { activeGame: null });
          });
        });
    });
  });
};


// ----------------------------------------------------

/**
 * Starting a new game
 *
 * @param {SocketIO.Socket} socket The current socket emitting the even
 * @param {SocketIO.Server} io The current socket io server
*/

const startANewGame = (socket, io) => {
  socket.on("codenamesStartNew", ({ userId }) => {
    Room.findOne({ "_users._id": userId }).exec().then(result => {
      Codenames.findOne({"_roomName": result._name})
        .exec()
        .then(currentGame => {
          currentGame.remove();
        });

      let gameInstance = gameInstances.getNewGameInstance('Codenames', result._name);

      // result._activeGame = gameInstance;

      gameInstance.save()
        .then(newGame => {
          io.to(result._name).emit('newGameData', { activeGame: newGame });
        });
    });
  });
};

// ----------------------------------------------------

module.exports = {
  codenamesEvents
};
