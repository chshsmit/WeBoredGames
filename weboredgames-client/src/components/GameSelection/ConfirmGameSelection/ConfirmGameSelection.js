/**
* ConfirmGameSelection.js
* @author Christopher Smith
* @description Modal to confirm game selection
* @created 2020-04-15T15:35:30.123Z-07:00
* @last-modified 2020-04-15T16:12:42.143Z-07:00
*/


// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

import './ConfirmGameSelection.css';

// ----------------------------------------------------

const ConfirmGameSelection = ({ selectedGame, modalIsOpen, toggleModal, confirmGameSelection }) => (
  <Modal isOpen={modalIsOpen} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>Confirm Selection</ModalHeader>
    <ModalBody>
      Are you sure you want to play <b>{selectedGame}</b>?
    </ModalBody>
    <ModalFooter>
      <Button
        color="success"
        onClick={() => {
          confirmGameSelection(selectedGame);
          toggleModal();
        }}
      >
        Yes
      </Button>
      <Button color="danger" onClick={toggleModal}>No</Button>
    </ModalFooter>
  </Modal>
);

// ----------------------------------------------------

export default ConfirmGameSelection;

ConfirmGameSelection.propTypes = {
  selectedGame: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  confirmGameSelection: PropTypes.func
};
