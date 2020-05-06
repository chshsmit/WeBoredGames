/**
* InformationModal.js
* @author Christopher Smith
* @description Information modal for all of the games
* @created 2020-05-05T13:42:45.276Z-07:00
* @last-modified 2020-05-06T16:12:37.534Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalHeader
} from 'reactstrap';

import { determineModalComponent } from './modalSelecter';
import './InformationModal.css';

// ----------------------------------------------------

const InformationModal = ({ gameName, isOpen, toggle }) => {
  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      toggle={toggle}
      className="information-modal"
    >
      <ModalHeader toggle={toggle}>{gameName} Information</ModalHeader>
      {determineModalComponent(gameName)}
    </Modal>
  );
};

export default InformationModal;

InformationModal.propTypes = {
  gameName: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
};
