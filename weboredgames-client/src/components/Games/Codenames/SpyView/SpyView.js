/**
* SpyView.js
* @author Christopher Smith
* @description View for a regular player that is guessing
* @created 2020-04-24T16:04:12.735Z-07:00
* @last-modified 2020-05-03T11:49:33.105Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {

} from 'reactstrap';

import './SpyView.css';

// ----------------------------------------------------

const SpyView = ({ currentlyUsersTurn, currentClue, currentUserIsGuesser }) => {

  // let message = currentlyUsersTurn ?
  //   'It is currently your teams turn.' :
  //   'It is not your teams turn';

  let clueWordText = currentClue.clueWord === "" ?
    "Waiting for clue to be given" :
    currentClue.clueWord;

  let wordCountText = currentClue.clueWord === "" ?
    "N/A" :
    currentClue.wordCount;

  return (
    <div className="spy-container">
      <div className="guess-information">
        {currentlyUsersTurn ? (
          currentClue.clueWord === "" ? (
            <>
              Waiting for a clue to be given...
            </>
          ) : (
            <>
              It is your team`$apos`s turn and you have <b>{currentClue.maximumGuesses - currentClue.currentGuesses}</b> guesses remaining. <br />
              {currentUserIsGuesser && 'You are currently the guesser for your team. Make a selection when ready.'}
            </>
          )
        ) : (
          currentClue.clueWord === "" ? (
            <>
              Other team is waiting for a clue to be given.
            </>
          ) : (
            <>
              It is currently the other teams turn and they have <b>{currentClue.maximumGuesses - currentClue.currentGuesses}</b> guesses remaining
            </>
          )
        )}
      </div>
      <div className="spy-clue-information">
        <p><b>Current Clue:</b> {clueWordText}</p>
        <p><b>Word Count:</b> {wordCountText}</p>
      </div>

      {/* <div className="turn-information">
        <b>{message}</b>
      </div> */}

    </div>
  );
};

export default SpyView;

SpyView.propTypes = {
  currentlyUsersTurn: PropTypes.bool,
  currentClue: PropTypes.object,
  currentUserIsGuesser: PropTypes.bool
};
