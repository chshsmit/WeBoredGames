/**
* PlayerListItem.js
* @author Christopher Smith
* @description ListGroupItem for player teams
* @created 2020-04-16T13:24:35.542Z-07:00
* @last-modified 2020-04-16T14:30:39.690Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  ListGroupItem,
  Input
} from 'reactstrap';

// ----------------------------------------------------

const PlayerListItem = ({ isRoomLeader, name, team, selectSpymaster, playerId }) => (
  <ListGroupItem id="playerTeamItem">
    <div className="player-name">
      <b>{name}</b>
    </div>
    { isRoomLeader && (
      <>
        <p className="spymaster-label">Spymaster</p>
        <Input
          id="spymasterInput"
          type="radio"
          name={team === "red" ? "spymasterRed" : "spymasterBlue"}
          onChange={() => selectSpymaster(playerId)}
        />
      </>
    )}
  </ListGroupItem>
);

export default PlayerListItem;

PlayerListItem.propTypes = {
  isRoomLeader: PropTypes.bool,
  name: PropTypes.string,
  team: PropTypes.string,
  playerId: PropTypes.string,
  selectSpymaster: PropTypes.func
};

