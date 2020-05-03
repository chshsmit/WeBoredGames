/**
* SpymasterView.js
* @author Christopher Smith
* @description Components only for the spymaster
* @created 2020-04-21T16:43:56.031Z-07:00
* @last-modified 2020-05-03T11:47:42.781Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Input
} from 'reactstrap';

import './SpymasterView.css';


// ----------------------------------------------------

const SpymasterView = ({ socket, skipDisabled, currentClue }) => {

  // ----------------------------------------------------

  const [clueWord, changeClueWord] = useState('');
  const [wordCount, changeWordCount] = useState(1);

  // ----------------------------------------------------

  const changeTeamsTurn = () => {
    const { userId } = this.props;
    socket.emit("codenamesChangeTeamsTurn", { userId });
  };

  // ----------------------------------------------------

  const giveClue = () => {
    const { userId } = this.props;
    socket.emit("codenamesGiveClue", { clueWord, wordCount, userId }, () => {
      changeClueWord('');
      changeWordCount(1);
    });
  };

  // ----------------------------------------------------

  return (
    <div className="spymaster-container">
      <div className="spymaster-clue">
        <Input
          type="text"
          placeholder="Give Clue"
          disabled={skipDisabled || currentClue.clueWord !== ""}
          value={currentClue.clueWord === "" ? clueWord : currentClue.clueWord}
          onChange={(event) => changeClueWord(event.target.value)}
        />
        <Input
          type="number"
          max={9}
          min={1}
          className="clue-number-input"
          disabled={skipDisabled || currentClue.clueWord !== ""}
          placeholder="# of Words"
          value={currentClue.wordCount === 0 ? wordCount : currentClue.wordCount}
          onChange={(event) => changeWordCount(Number(event.target.value))}
        />
        <Button
          className="give-clue-button"
          disabled={skipDisabled || currentClue.clueWord !== ""}
          onClick={() => giveClue()}
          color="success"
        >
          {currentClue.clueWord !== "" ? "Locked" : "Give"}
        </Button>
      </div>
      <Button
        color="success"
        className="skip-turn-button"
        onClick={() => changeTeamsTurn()}
        disabled={skipDisabled}
      >
        Skip
      </Button>
    </div>
  );

};


export default SpymasterView;

// ----------------------------------------------------

SpymasterView.propTypes = {
  socket: PropTypes.object,
  skipDisabled: PropTypes.bool,
  currentClue: PropTypes.object,
  userId: PropTypes.string
};
