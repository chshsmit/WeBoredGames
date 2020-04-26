/**
* CodenamesSchema.js
* @author Christopher Smith
* @description
* @created 2020-04-18T16:19:06.840Z-07:00
* @copyright
* @last-modified 2020-04-25T13:17:50.206Z-07:00
*/

// ----------------------------------------------------

const mongoose = require('mongoose');


// ----------------------------------------------------

const codenamesSchema = mongoose.Schema({
  _gameName: {
    type: String,
    default: "Codenames"
  },
  _redTeam: {
    type: Array,
    default: []
  },
  _blueTeam: {
    type: Array,
    default: []
  },
  _words: Array,
  _assassin: Object,
  _redWords: Array,
  _blueWords: Array,
  _spyMasterRed: {
    type: String,
    default: ""
  },
  _spyMasterBlue: {
    type: String,
    default: ""
  },
  _designatedBlueGuesser: String,
  _designatedRedGuesser: String,
  _teamsConfirmed: {
    type: Boolean,
    default: false
  },
  _roomName: String,
  _currentTeamsTurn: {
    type: String,
    default: "Red"
  },
  _selectedWords: {
    type: Array,
    default: []
  },
  _currentClue: {
    type: Object,
    default: {
      wordCount: 0,
      clueWord: "",
      maximumGuesses: 0,
      currentGuesses: 0
    }
  },
  _gameResults: {
    type: Object,
    default: {
      gameIsOver: false,
      gameWinner: null
    }
  }
});


module.exports = mongoose.model('Codenames', codenamesSchema);
