/**
* Navigation.js
* @author Christopher Smith
* @description The main navbar component
* @created 2020-05-02T22:19:20.242Z-07:00
* @last-modified 2020-05-02T22:32:53.582Z-07:00
*/

// -----------------------------------------------------------

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

import './Navigation.css';

// -----------------------------------------------------------

const Navigation = ({ auth }) => {

  console.log(auth);

  // No navbar on the signin page
  if (!auth.isAuthenticated) return null;

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

export default connect(mapStateToProps)(Navigation);

// -----------------------------------------------------------

Navigation.propTypes = {
  auth: PropTypes.object
};
