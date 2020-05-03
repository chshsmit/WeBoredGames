/**
 * Join.js
 * @author Christopher Smith
 * @description Joining or creating a room
 * @created 2020-04-10T22:15:59.497Z-07:00
 * @last-modified 2020-05-02T17:42:14.307Z-07:00
*/

// -----------------------------------------------------------

import React, { useState } from "react";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import "./Join.css";

import EnterModal from 'components/LandingPage/EnterModal/EnterModal';

// ----------------------------------------------------

const Join = (props) => {

  const [modalIsOpen, changeModalVis] = useState(false);
  const [modalType, setModalType] = useState('');

  const toggleModal = () => changeModalVis(!modalIsOpen);

  return (
    <Container fluid className="join-main-container">
      <Row className="justify-content-center">
        <Col
          xs="12"
          sm="12"
          lg="6"
          className="text-center"
        >
          <h1 className="welcome-text">
            Welcome to WeBoredGames!
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center join-button-row">
        <Col
          xs="6"
          sm="4"
          lg="2"
          className="content-align-end"
        >
          <Button
            onClick={() => {
              toggleModal();
              setModalType('create');
            }}
            color="success"
          >
            <i className="fas fa-plus fa-xs mr-1" />
            Create a room
          </Button>
        </Col>
        <Col
          xs="6"
          sm="4"
          lg="2"
          className="content-align-start"
        >
          <Button
            onClick={() => {
              toggleModal();
              setModalType('join');
            }}
            color="success"
          >
            <i className="fas fa-users mr-1 fa-xs" />
            Join a room
          </Button>
        </Col>
      </Row>
      <EnterModal
        isOpen={modalIsOpen}
        toggleVis={toggleModal}
        type={modalType}
        userData={props.userData}
      />
    </Container>
  );
};

// ----------------------------------------------------

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData
  };
};

export default connect(mapStateToProps)(Join);

Join.propTypes = {
  userData: PropTypes.object
};
