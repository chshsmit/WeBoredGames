/**
* MainGameSelectionContainer.js
* @author Christopher Smith
* @description Main component for selecting a game to play
* @created 2020-04-15T15:10:43.161Z-07:00
* @last-modified 2020-05-08T19:26:24.767Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Table,
  Button
} from 'reactstrap';

import { GAME_SELECTIONS } from 'models/Games';

import './MainGameSelectionContainer.css';

import ConfirmGameSelection from 'components/GameSelection/ConfirmGameSelection/ConfirmGameSelection';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';

import InformationModal from 'components/Games/InformationModal/InformationModal';


// ----------------------------------------------------

const MainGameSelectionContainer = ({ setActiveGame, socket }) => {

  const [confirmOpen, openConfirmModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [infoModalOpen, toggleInfoModal] = useState(false);
  const [gameUserWantsInfoFor, changeGameUserWantsInfoFor] = useState("");
  const [navModalOpen, changeNavModalVis] = useState(false);
  const [shouldLeave, letUserLeave] = useState(false);

  const toggleConfirm = () => openConfirmModal(!confirmOpen);
  const toggleInfo = () => toggleInfoModal(!infoModalOpen);

  // ----------------------------------------------------

  const toggleNavModal = () => changeNavModalVis(!navModalOpen);
  const leaveRoom = () => {
    socket.disconnect();
    letUserLeave(true);
  };

  if (shouldLeave) return <Redirect to="/home" />;

  // ----------------------------------------------------

  // TODO: Make this a database call instead
  let gameRows = GAME_SELECTIONS.filter(game => game.isActive).map((game) => (
    <tr key={game.gameName}>
      <td><b>{game.gameName}</b></td>
      <td>{game.recommendedNumberOfPlayers}</td>
      <td>
        <Button
          color="info"
          onClick={() => {
            changeGameUserWantsInfoFor(game.gameName);
            toggleInfo();
          }}
        >
          <i className="fas fa-info" />
        </Button>
      </td>
      <td>
        <Button
          color="primary"
          onClick={() => {
            setSelectedGame(game.gameName);
            toggleConfirm();
          }}
        >
          Start
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className="game-selection">
      <h1 className="game-selection-header">Select a Game!</h1>
      <Table bordered id="gameSelectionTable">
        <thead className="game-selection-table-header">
          <tr>
            <th>Game Name</th>
            <th>Number of Players</th>
            <th>Game Info</th>
            <th>Start</th>
          </tr>
        </thead>
        <tbody id="gameSelectionTableBody">
          {gameRows}
          <tr>
            <td colSpan={100}>
              <b>Come back for more games in the future!</b>
            </td>
          </tr>
        </tbody>
      </Table>


      <Button
        className="leave-lobby"
        color="danger"
        onClick={toggleNavModal}
      >
        Leave Room
      </Button>

      <ConfirmModal
        isOpen={navModalOpen}
        toggle={toggleNavModal}
        confirmAction={leaveRoom}
        message="Are you sure you want to leave the room?"
        confirmButtonText="Leave"
        cancelButtonText="Stay"
      />

      <ConfirmGameSelection
        selectedGame={selectedGame}
        toggleModal={toggleConfirm}
        modalIsOpen={confirmOpen}
        confirmGameSelection={setActiveGame}
      />
      <InformationModal
        isOpen={infoModalOpen}
        toggle={toggleInfo}
        gameName={gameUserWantsInfoFor}
      />
    </div>
  );
};


// ----------------------------------------------------

export default MainGameSelectionContainer;

MainGameSelectionContainer.propTypes = {
  setActiveGame: PropTypes.func,
  socket: PropTypes.object
};
