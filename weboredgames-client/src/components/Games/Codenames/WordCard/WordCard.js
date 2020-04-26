/**
* WordCard.js
* @author Christopher Smith
* @description Main word card for the gameboard
* @created 2020-04-16T16:58:32.437Z-07:00
* @last-modified 2020-04-25T13:06:27.566Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';


import {
  Card,
  CardBody,
  CardText
} from 'reactstrap';

import './WordCard.css';


// ----------------------------------------------------

const WordCard = ({ word, cardTeam, gameData, userData, disabled, wordSelected, selectWord, currentUsersTeam }) => {

  console.log(cardTeam);
  console.log(gameData);
  console.log(userData);

  let className = [gameData._spyMasterBlue, gameData._spyMasterRed].includes(userData.userId) ?
                    `${cardTeam}-spymaster` :
                    `normal-card`;

  const currentUserSpymaster = [gameData._spyMasterBlue, gameData._spyMasterRed].includes(userData.userId);

  const isCurrentGuesser = currentUsersTeam === 'Red' ?
      gameData._designatedRedGuesser === userData.userId :
      gameData._designatedBlueGuesser === userData.userId;


  if (wordSelected) {
    className = `${cardTeam}-word-selected`
  }

  return (
    <button
      id="wordCard"
      className={className}
      disabled={disabled || currentUserSpymaster || wordSelected || !isCurrentGuesser}
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
