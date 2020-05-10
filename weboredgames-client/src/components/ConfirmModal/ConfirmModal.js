/**
* ConfirmModal.js
* @author Christopher Smith
* @description Modal Used to confirm an action
* @created 2020-05-08T19:08:55.230Z-07:00
* @last-modified 2020-05-08T19:20:21.135Z-07:00
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

// ----------------------------------------------------

const ConfirmModal = ({ isOpen, toggle, confirmAction, message, header, confirmButtonText, cancelButtonText}) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>{header}</ModalHeader>
    <ModalBody>
      {message}
    </ModalBody>
    <ModalFooter>
      <Button color="success" onClick={confirmAction}>{confirmButtonText}</Button>
      <Button color="danger" onClick={toggle}>{cancelButtonText}</Button>
    </ModalFooter>
  </Modal>
);

export default ConfirmModal;

// ----------------------------------------------------

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  header: PropTypes.string,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string
};

ConfirmModal.defaultProps = {
  header: "Confirm Action",
  confirmButtonText: "Confirm",
  cancelButtonText: "Cancel"
};
