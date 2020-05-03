/**
* TeamSelection.js
* @author Christopher Smith
* @description Selecting Teams for codenames
* @created 2020-04-16T11:37:01.583Z-07:00
* @last-modified 2020-05-03T11:43:39.680Z-07:00
*/

// ----------------------------------------------------

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';

import PlayerListItem from './PlayerListItem';

import './TeamSelection.css';


// ----------------------------------------------------

const TeamSelection = (props) => {

  // ----------------------------------------------------

  const {
    redTeam,
    blueTeam,
    currentUserData,
    roomLeader,
    allPlayers,
    socket
  } = props;


  // ----------------------------------------------------

  const [redSpymaster, setRedSpymaster] = useState("");
  const [blueSpymaster, setBlueSpymaster] = useState("");

  // ----------------------------------------------------

  const chooseTeam = (wantedTeam) => {
    socket.emit("codenamesJoinTeam", { wantedTeam, userId: currentUserData.userId }, () => {
    });
  };

  const confirmTeams = (spymasters) => {
    socket.emit("codenamesConfirmTeams", { spymasters, userId: currentUserData.userId }, () => {
    });
  };

  useEffect(() => {
    if(!redTeam.includes(redSpymaster)) setRedSpymaster('');
    if(!blueTeam.includes(blueSpymaster)) setBlueSpymaster('');
  }, [redTeam, redSpymaster, blueTeam, blueSpymaster]);


  // ----------------------------------------------------

  let redTeamItems = redTeam.length === 0 ? (
    <ListGroupItem><b>No red members yet</b></ListGroupItem>
  ) : (
    redTeam.map((playerId) => (
      <PlayerListItem
        isRoomLeader={roomLeader.leaderId === currentUserData.userId}
        name={allPlayers.find((player) => player._id === playerId)._name}
        team="red"
        key={playerId}
        playerId={playerId}
        selectSpymaster={setRedSpymaster}
      />
    ))
  );

  let blueTeamItems = blueTeam.length === 0 ? (
    <>
      <ListGroupItem><b>No blue members yet</b></ListGroupItem>
    </>
  ) : (
    blueTeam.map((playerId) => (
      <PlayerListItem
        isRoomLeader={roomLeader.leaderId === currentUserData.userId}
        name={allPlayers.find((player) => player._id === playerId)._name}
        team="blue"
        key={playerId}
        playerId={playerId}
        selectSpymaster={setBlueSpymaster}
      />
    ))
  );

  // ----------------------------------------------------

  return (
    <div className="team-selection-container">
      <h1 className="choose-team-header">Choose Your Team</h1>
      <div className="team-selection-buttons">
        <Button
          color="danger"
          id="redTeamButton"
          onClick={() => chooseTeam("red")}
        >
          <b>Red</b>
        </Button>
        <Button
          color="primary"
          id="blueTeamButton"
          onClick={() => chooseTeam("blue")}
        >
          <b>Blue</b>
        </Button>
      </div>
      <div className="team-lists">
        <ListGroup id="redTeamList">
          {redTeamItems}
        </ListGroup>
        <ListGroup id="blueTeamList">
          {blueTeamItems}
        </ListGroup>
      </div>

      {roomLeader.leaderId === currentUserData.userId && (
        <div className="confirm-teams">
          <Button
            color="success"
            disabled={
              redTeam.length + blueTeam.length < allPlayers.length
              || redSpymaster === ""
              || blueSpymaster === ""
            }
            onClick={() => confirmTeams({redSpymaster, blueSpymaster})}
          >
            Confirm Teams
          </Button>
        </div>
      )}
    </div>
  );
};


// ----------------------------------------------------

export default TeamSelection;

TeamSelection.propTypes = {
  redTeam: PropTypes.array,
  blueTeam: PropTypes.array,
  currentUserData: PropTypes.object,
  roomLeader: PropTypes.object,
  allPlayers: PropTypes.array,
  socket: PropTypes.object
};
