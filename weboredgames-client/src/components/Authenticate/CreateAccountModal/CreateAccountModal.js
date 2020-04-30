/**
* CreateAccountModal.js
* @author Christopher Smith
* @description Modal to create an account
* @created 2020-04-30T10:36:21.060Z-07:00
* @last-modified 2020-04-30T10:56:21.699Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form
} from 'reactstrap';

import './CreateAccountModal.css';

import CreateAccountForm from 'components/Authenticate/CreateAccountForm/CreateAccountForm';

// ----------------------------------------------------

const CreateAccountModal = ({ isOpen, toggleVisibility }) => {

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleVisibility}
    >
      <ModalHeader toggle={toggleVisibility}>Create an account</ModalHeader>
      <Form>
        <ModalBody>
          <CreateAccountForm />
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit">Create</Button>
          <Button color="danger" onClick={toggleVisibility}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CreateAccountModal;

// ----------------------------------------------------

CreateAccountModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleVisibility: PropTypes.func
};
