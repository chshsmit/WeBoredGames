/**
* Codenames.js
* @author Christopher Smith
* @description The main component for Codenames
* @created 2020-04-15T18:03:36.190Z-07:00
* @last-modified 2020-05-16T19:47:11.290Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import TeamSelection from 'components/Games/Codenames/TeamSelection/TeamSelection';
import GameBoard from 'components/Games/Codenames/GameBoard/GameBoard';
import './Codenames.css';

// ----------------------------------------------------

const Codenames = ({ roomData, currentUserData, socket, activeGame }) => {

  const getCurrentUsersTeam = (currentUserId) => {
    if (activeGame._redTeam.includes(currentUserId)) return "Red";
    if (activeGame._blueTeam.includes(currentUserId)) return "Blue";
    return "No-Team";
  };

  return activeGame._teamsConfirmed ? (
    <GameBoard
      gameData={activeGame}
      currentUserData={currentUserData}
      socket={socket}
      currentUsersTeam={getCurrentUsersTeam(currentUserData.userId)}
      currentUserIsRoomLeader={currentUserData.userId === roomData._roomLeader.leaderId}
    />
  ) : (
    <TeamSelection
      redTeam={activeGame._redTeam}
      blueTeam={activeGame._blueTeam}
      currentUserData={currentUserData}
      roomLeader={roomData._roomLeader}
      allPlayers={roomData._users}
      socket={socket}
    />
  );
};

export default Codenames;

Codenames.propTypes = {
  roomData: PropTypes.object,
  currentUserData: PropTypes.object,
  socket: PropTypes.object,
  activeGame: PropTypes.object
};
