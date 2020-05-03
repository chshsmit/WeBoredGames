/**
 * Home.js
 * @author Christopher Smith
 * @description Logged in users home page
 * @created 2020-04-10T22:15:59.497Z-07:00
 * @last-modified 2020-05-03T12:58:37.491Z-07:00
*/

// -----------------------------------------------------------

import React, { useState } from "react";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col
} from "reactstrap";
import "./Home.css";

import EnterModal from 'components/HomePage/EnterModal/EnterModal';
import HomeNavigation from 'components/HomePage/HomeNavigation/HomeNavigation';
// ----------------------------------------------------

const Home = (props) => {

  const [modalIsOpen, changeModalVis] = useState(false);
  const [modalType, setModalType] = useState('');
  const toggleModal = () => changeModalVis(!modalIsOpen);

  return (
    <div className="home-page-content">
      <HomeNavigation toggleModal={toggleModal} setModalType={setModalType} />
      <Container fluid className="join-main-container">
        <Row className="justify-content-center">
          <Col
            xs="12"
            sm="12"
            lg="6"
            className="text-center"
          >
            <h1 className="welcome-text">
              Welcome to WeBoredGames {props.userData._name}!
            </h1>
          </Col>
        </Row>
        <EnterModal
          isOpen={modalIsOpen}
          toggleVis={toggleModal}
          type={modalType}
          userData={props.userData}
        />
      </Container>
    </div>
  );
};

// ----------------------------------------------------

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData
  };
};

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  userData: PropTypes.object
};
