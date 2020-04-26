/**
* allGames.js
* @author Christopher Smith
* @description Creating a new blank game
* @created 2020-04-15T17:57:32.130Z-07:00
* @last-modified 2020-04-20T19:58:40.317Z-07:00
*/

// ----------------------------------------------------

// Codenames
const Codenames = require('./Codenames/Codenames');
const codenamesWords = require('./Codenames/codeNamesWords');

// ----------------------------------------------------

/**
 * Getting a new instance of the game the users want to play
 *
 * @param {string} gameName The name of the game the users want to play
*/

function getNewGameInstance(gameName, roomName) {
  let newGame;

  switch(gameName) {
    case 'Codenames': {
      const wordInfo = codenamesWords.getGameInfo();
      newGame = new Codenames({
        _words: wordInfo.words,
        _assassin: wordInfo.assassin,
        _redWords: wordInfo.redTeamWords,
        _blueWords: wordInfo.blueTeamWords,
        _roomName: roomName
      });
      break;
    }

    default:
      newGame = new Codenames();
      break;
  }

  return newGame;
}

module.exports = {
  getNewGameInstance
};
