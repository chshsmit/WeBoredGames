/**
* CreateAccountModal.js
* @author Christopher Smith
* @description Modal to create an account
* @created 2020-04-30T10:36:21.060Z-07:00
* @last-modified 2020-04-30T12:24:33.927Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';
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

  const [formValues, changeFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toggle = () => {
    changeFormValue({});
    toggleVisibility();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>Create an account</ModalHeader>
      <Form>
        <ModalBody>
          <CreateAccountForm
            formValues={formValues}
            changeFormValue={changeFormValue}
            passwordsMatch={formValues.confirmPassword === formValues.password}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit">Create</Button>
          <Button color="danger" onClick={toggle}>Cancel</Button>
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
