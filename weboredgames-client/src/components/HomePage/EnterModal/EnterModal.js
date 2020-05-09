/**
* EnterModal.js
* @author Christopher Smith
* @description Modal to enter or join a room
* @created 2020-04-11T13:02:00.189Z-07:00
* @last-modified 2020-05-09T11:11:47.812Z-07:00
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

import { makeId } from 'utils/utils';

import "./EnterModal.css";

// ----------------------------------------------------

const EnterModal = ({ isOpen, toggleVis, type, userData }) => {

  const [roomName, setRoomName] = useState('');

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
            <Label for="roomNameInput">Enter Room Name</Label>
            <Input
              placeholder="Room"
              id="roomNameInput"
              type="text"
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Link
          to={{
            pathname: `/room/${makeId(6)}`,
            state: { type, userData, roomName }
          }}
        >
          <Button
            color="success"
            disabled={!roomName}
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
