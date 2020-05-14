/**
* EnterModal.js
* @author Christopher Smith
* @description Modal to enter or join a room
* @created 2020-04-11T13:02:00.189Z-07:00
* @last-modified 2020-05-13T17:24:04.203Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Row,
  Col,
  Label
} from 'reactstrap';

import "./EnterModal.css";

// ----------------------------------------------------

const EnterModal = ({ isOpen, toggleVis, type, userData }) => {

  const [roomName, setRoomName] = useState('');
  const [roomCodeWord, setRoomCodeWord] = useState('');

  // capitalizing the type of the room
  let capitalType = type.charAt(0).toUpperCase() + type.slice(1);


  // When the modal toggles we want to reset the state
  const toggle = () => {
    setRoomName('');
    toggleVis();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>{`${capitalType} a Room`}</ModalHeader>
      <ModalBody>
        <Row className="roomname-input">
          <Col>
            <Label htmlFor="roomNameInput">Enter Room Name</Label>
            <Input
              placeholder="Room"
              id="roomNameInput"
              type="text"
              className="room-name-input"
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
            />
            <Label htmlFor="roomPassword">Room Code Word</Label>
            <Input
              placeholder="Code Word"
              id="roomPassword"
              type="password"
              value={roomCodeWord}
              onChange={(event) => setRoomCodeWord(event.target.value)}
              autoComplete="new-password"
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Link
          to={{
            pathname: "/room",
            state: { type, userData, roomName, roomCodeWord }
          }}
        >
          <Button
            color="success"
            disabled={!roomName || !roomCodeWord}
          >
            {capitalType}
          </Button>
        </Link>
        <Button color="danger" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

// ----------------------------------------------------

export default EnterModal;

EnterModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleVis: PropTypes.func,
  type: PropTypes.oneOf([
    "",
    "create",
    "join"
  ]),
  userData: PropTypes.object,
};
