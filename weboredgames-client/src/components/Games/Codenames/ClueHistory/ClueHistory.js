/**
* ClueHistory.js
* @author Christopher Smith
* @description All of the clues that have been given so far
* @created 2020-05-04T16:56:09.538Z-07:00
* @last-modified 2020-05-04T17:39:55.308Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {

} from 'reactstrap';

import './ClueHistory.css';

// ----------------------------------------------------

const ClueHistory = ({ clueHistory }) => {

  console.log(clueHistory);

  const redHistory = clueHistory.redClues.map(clue => (
    <p key={clue.clueWord}>Clue: {clue.clueWord}, {clue.wordCount}</p>
  ));

  const blueHistory = clueHistory.blueClues.map(clue => (
    <p key={clue.clueWord}>Clue: {clue.clueWord}, {clue.wordCount}</p>
  ));

  return (
    <div className="clue-history-container">
      <h4><u>Clue History</u></h4>
      <div className="clue-history">
        <div className="red-history">
          <u><b>Red Clues</b></u>
          {redHistory}
        </div>
        <div className="blue-history">
          <u><b>Blue Clues</b></u>
          {blueHistory}
        </div>
      </div>
    </div>
  );
};

export default ClueHistory;

ClueHistory.propTypes = {
  clueHistory: PropTypes.object
};
