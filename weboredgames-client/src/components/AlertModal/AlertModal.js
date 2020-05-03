/**
* AlertModal.js
* @author Christopher Smith
* @description Modal for alert messages
* @created 2020-04-30T12:37:39.625Z-07:00
* @last-modified 2020-04-30T12:46:34.373Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

import './AlertModal.css';

// ----------------------------------------------------

const AlertModal = ({ headerMessage, message, toggle, isOpen }) => (
  <Modal isOpen={isOpen} toggle={() => toggle()}>
    <ModalHeader toggle={() => toggle()}>{headerMessage}</ModalHeader>
    <ModalBody className="alert-modal-body"><b>{message}</b></ModalBody>
  </Modal>
);

export default AlertModal;

// ----------------------------------------------------

AlertModal.propTypes = {
  headerMessage: PropTypes.string,
  message: PropTypes.string,
  toggle: PropTypes.func,
  isOpen: PropTypes.bool
};
