/**
* InfoPageOne.js
* @author Christopher Smith
* @description The first page of the information for codenames
* @created 2020-05-05T17:05:37.567Z-07:00
* @last-modified 2020-05-05T18:07:10.875Z-07:00
*/


// ----------------------------------------------------

import React from 'react';
import './InfoPages.css';

// ----------------------------------------------------

const InfoPageOne = () => (
  <div className="info-page-one">
    <h2 className="info-page-header"><u>Game Overview</u></h2>
    <p>
      Spymasters know which team all 25 cards belong to. The guessers only know the words. The spymasters will take turns giving one word clues, where a word
      can relate to multiple words on the board. Once a clue is given the spymasters teammates discuss and try to guess words based on the given clue. The first team to guess all
      of their team&apos;s words wins!
    </p>
  </div>
);


// ----------------------------------------------------

const InfoPageTwo = () => (
  <div className="info-page-two">
    <h2 className="info-page-header"><u>Giving Clues</u></h2>
    <p>
      If you are the spymaster, you are trying to think of a one-word clue that can relate to multiple words that you are trying to get your team to guess.
      Once you have thought of a clue, you type it into the <b>Clue Word</b> text box and provide a number, then press &apos;Give&apos;. The number relates
      to how many words on the board are related to your clue.
    </p>
    <p><b>Example:</b> Two of your words are TREE and DOG. Trees grow bark and dogs bark. So you can give a clue of BARK: 2</p>

    <h2 className="info-page-header"><u>One Word</u></h2>
    <p>
      Your clue can only be <b>ONE WORD</b>. No extra hints or facial expressions are allowed (e.g &quot;This is kind of a stretch...&quot;). Your clue cannot be
      any of the clues on the board. Once a word has been selected it can be given as a clue, so clues that start off not allowed can be allowed later in the game.
    </p>
  </div>
);

// ----------------------------------------------------

const InfoPageThree = () => (
  <div className="info-page-three">
    <h2 className="info-page-header"><u>Guessing</u></h2>
    <p>
      Once a clue is given, one person on the spymasters team will be given the role of the <b>Designated Guesser</b>. This role will be indicated in the bottom left
      of the board, and the border will be flashing. This means that user is the only one allowed to click on a word to guess. All of the other players on the spymasters
      team can discuss the clue and what words they think it relates to, but only the designated guesser can select a word. Once the teammates are ready to guess, the guesser
      can select a word.
    </p>
    <h3 className="info-page-header"><u>Outcomes</u></h3>
    <ul>
      <li className="info-list-item">
        If the guesser selects a word that belongs to their team, the card will change to their teams color.
        The same team can get another guess, but cannot get another clue.
      </li>
      <li className="info-list-item">
        If the guesser selects a neutral word, the card will change to a tan color.
        This ends the current teams turn and play will move on to the opposing team.
      </li>
      <li className="info-list-item">
        If the guesser selects a word belonging to the the other team, the card will change to the other teams color.
        This ends the current teams turn and play will move on to the opposing team.
      </li>
      <li className="info-list-item">
        If the guesser selects the <b>Sudden Death</b> word, the game is over and the other team automatically wins! This card is denoted by a black bakcground.
      </li>
    </ul>
  </div>
);

// ----------------------------------------------------

const InfoPageFour = () => (
  <div className="info-page-four">
    <h2 className="info-page-header"><u>Number of Guesses</u></h2>
    <p>
      The guessers must make <b>at leadt one guess</b>. A wrong guess will end the turn, but if they guess a correct word they can continue guessing. <br />
      <b>Your team is allowed one more guess than the number that was given for the current clue</b>. <br /> <br />

      <b>Example: </b> <br /> The given clue was <b>River: 2</b>. The team guesses <b>Water</b> and <b>Fish</b>. On the previous turn, the clue was <b>Tree: 3</b>. The guessers
      guessed <b>Leaf</b> and <b>Canopy</b> but guessed the third word incorrectly. They can now make an extra guess based on the previous clue and decide to guess <b>Apple</b> and
      get it correct. This is 3 guesses and ends the turn since the team has reached the max number of guesses.
    </p>
  </div>
);

// ----------------------------------------------------

const InfoPageFive = () => (
  <div className="info-page-five">
    <h2 className="info-page-header"><u>Ending The Game</u></h2>
    <p>
      <b>The game is over once a team has guessed all of their words correctly</b>. It is possible to win when it is the other teams guess if they guess your last word.
      The game also ends early if a team selects the <b>Sudden Death</b> card. All of the cards will change colors and the winner will be listed at the top when the game is over.
    </p>
  </div>
);

// ----------------------------------------------------

export const infoPages = [
  <InfoPageOne key={1} />,
  <InfoPageTwo key={2} />,
  <InfoPageThree key={3} />,
  <InfoPageFour key={4} />,
  <InfoPageFive key={5} />
];
