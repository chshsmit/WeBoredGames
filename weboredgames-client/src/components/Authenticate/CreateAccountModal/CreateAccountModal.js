/**
* CreateAccountModal.js
* @author Christopher Smith
* @description Modal to create an account
* @created 2020-04-30T10:36:21.060Z-07:00
* @last-modified 2020-05-02T16:02:32.504Z-07:00
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
import axios from 'axios';

import CreateAccountForm from 'components/Authenticate/CreateAccountForm/CreateAccountForm';
import AlertModal from 'components/AlertModal/AlertModal';

// ----------------------------------------------------

const CreateAccountModal = ({ isOpen, toggleVisibility }) => {

  // ----------------------------------------------------

  const [formValues, changeFormValue] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });

  const [wrongPasswordsVis, changeWrongPassVis] = useState(false);

  const [createErrorVis, changeCreateErrorVis] = useState(false);
  const [createErrorMessage, changeErrorMessage] = useState("");

  const [creationSuccessfulVis, changeCreationSuccessVis] = useState(false);

  // ----------------------------------------------------
  // Functions
  // ----------------------------------------------------

  const toggle = () => {
    changeFormValue({});
    toggleVisibility();
  };

  // ----------------------------------------------------

  const onSubmit = (event) => {
    event.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      changeWrongPassVis(true);
      return;
    }

    const userData = {
      email: formValues.email,
      password: formValues.password,
      userName: formValues.userName,
      firstName: formValues.firstName,
      lastName: formValues.lastName
    };

    axios.post('http://localhost:5000/api/auth/register', userData)
      .then(response => {
        console.log(response);
        changeCreationSuccessVis(!creationSuccessfulVis);
        toggle();
      })
      .catch(err => {
        changeErrorMessage(err.response.data.error);
        changeCreateErrorVis(!createErrorVis);
      });

  };


  // ----------------------------------------------------

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Create an account</ModalHeader>
        <Form onSubmit={onSubmit}>
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
      <AlertModal
        isOpen={wrongPasswordsVis}
        headerMessage="Wrong Passwords"
        message="Passwords do not match"
        toggle={() => changeWrongPassVis(!wrongPasswordsVis)}
      />
      <AlertModal
        isOpen={createErrorVis}
        headerMessage="Error"
        message={createErrorMessage}
        toggle={() => changeCreateErrorVis(!createErrorVis)}
      />
      <AlertModal
        isOpen={creationSuccessfulVis}
        headerMessage="Success"
        message="Account created successfully. Please login to cotinue."
        toggle={() => changeCreationSuccessVis(!creationSuccessfulVis)}
      />
    </>
  );
};

export default CreateAccountModal;

// ----------------------------------------------------

CreateAccountModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleVisibility: PropTypes.func
};
