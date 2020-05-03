/**
* GuestAuthentication.js
* @author Christopher Smith
* @description Modal for continuig as a guest
* @created 2020-05-03T12:41:23.843Z-07:00
* @last-modified 2020-05-03T12:57:29.520Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Label,
  Button
} from 'reactstrap';

// ----------------------------------------------------

const GuestAuthentication = ({ toggle, isOpen, authenticateGuest }) => {

  const [userName, changeUserName] = useState('');

  const submit = (event) => {
    event.preventDefault();

    console.log("we are here")

    authenticateGuest({ userName });
    toggle();
  };


  return (
    <Modal toggle={toggle} isOpen={isOpen}>
      <ModalHeader toggle={toggle}>Guest Account</ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <Label htmlFor="guestuserName">Display Name</Label>
          <Input
            type="text"
            placeholder="Display Name"
            id="guestuserName"
            value={userName}
            onChange={(event) => changeUserName(event.target.value)}
            required
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="success">Continue</Button>
          <Button color="danger" onClick={() => toggle()}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default GuestAuthentication;

// ----------------------------------------------------

GuestAuthentication.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  authenticateGuest: PropTypes.func
};
