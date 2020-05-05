/**
* WordCard.js
* @author Christopher Smith
* @description Main word card for the gameboard
* @created 2020-04-16T16:58:32.437Z-07:00
* @last-modified 2020-05-04T16:46:45.475Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';


import './WordCard.css';


// ----------------------------------------------------

const WordCard = ({ word, cardTeam, gameData, userData, disabled, wordSelected, selectWord, currentUsersTeam }) => {

  let className = [gameData._spyMasterBlue, gameData._spyMasterRed].includes(userData.userId) ?
                    `${cardTeam}-spymaster` :
                    `normal-card`;

  const currentUserSpymaster = [gameData._spyMasterBlue, gameData._spyMasterRed].includes(userData.userId);

  const isCurrentGuesser = currentUsersTeam === 'Red' ?
      gameData._designatedRedGuesser === userData.userId :
      gameData._designatedBlueGuesser === userData.userId;


  if (wordSelected) className = `${cardTeam}-word-selected`;

  if(gameData._gameResults.gameIsOver) className = `${cardTeam}-spymaster`;

  return (
    <button
      id="wordCard"
      className={className}
      disabled={disabled || currentUserSpymaster || wordSelected || !isCurrentGuesser || gameData._currentClue.clueWord === ""}
      onClick={() => selectWord(word)}
    >
      <b>{word.word}</b>
    </button>
  );
};


// ----------------------------------------------------

export default WordCard;

WordCard.propTypes = {
  word: PropTypes.object,
  cardTeam: PropTypes.string,
  gameData: PropTypes.object,
  userData: PropTypes.object,
  disabled: PropTypes.bool,
  wordSelected: PropTypes.bool,
  socket: PropTypes.object,
  selectWord: PropTypes.func,
  currentUsersTeam: PropTypes.string
};
