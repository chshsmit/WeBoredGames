/**
* determineGameComponent.js
* @author Christopher Smith
* @description Determining which game we are playing
* @created 2020-04-15T18:06:31.193Z-07:00
* @copyright
* @last-modified 2020-04-18T17:16:55.313Z-07:00
*/

// ----------------------------------------------------

import React from 'react';

import Codenames from 'components/Games/Codenames/MainGame/Codenames';

// ----------------------------------------------------


/**
 * Returning the component of the game we want to play
 *
 * @param {string} gameName The name of the game the users want to play
*/

export function determineGame(roomData, activeGame, currentUserData, socket) {

  let game;
  switch(activeGame._gameName) {
    case "Codenames":
      game = (
        <Codenames
          roomData={roomData}
          activeGame={activeGame}
          currentUserData={currentUserData}
          socket={socket}
        />
      );
      break;

    case "One Night Werewolf":
      game = null;
      break;

    default:
      game = null;
      break;
  }

  return game;
}
