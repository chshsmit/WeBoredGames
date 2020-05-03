/**
* HomeNavigation.js
* @author Christopher Smith
* @description The main navbar component
* @created 2020-05-02T22:19:20.242Z-07:00
* @last-modified 2020-05-02T22:47:03.314Z-07:00
*/

// -----------------------------------------------------------

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Navbar,
  NavbarBrand,
  UncontrolledDropdown
} from 'reactstrap';

import './HomeNavigation.css';

// -----------------------------------------------------------

const HomeNavigation = ({ auth }) => {

  console.log(auth);

  return (
    <Navbar color="light" light id="mainNavbar">
      <NavbarBrand>WeBoredGames</NavbarBrand>
    </Navbar>
  );

};


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(HomeNavigation);

// -----------------------------------------------------------

HomeNavigation.propTypes = {
  auth: PropTypes.object
};
