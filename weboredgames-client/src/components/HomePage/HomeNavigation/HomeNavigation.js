/**
* HomeNavigation.js
* @author Christopher Smith
* @description The main navbar component
* @created 2020-05-02T22:19:20.242Z-07:00
* @last-modified 2020-05-03T17:46:53.647Z-07:00
*/

// -----------------------------------------------------------

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  Nav,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import './HomeNavigation.css';

import UserInfoDropdown from 'components/UserInfoDropdown/UserInfoDropdown';

// -----------------------------------------------------------

const HomeNavigation = ({ auth, setModalType, toggleModal }) => {

  console.log(auth);

  return (
    <Navbar color="dark" dark id="mainNavbar">
      <NavbarBrand href="/home">WeBoredGames</NavbarBrand>
      <Nav>
        <UncontrolledDropdown nav>
          <DropdownToggle nav caret id="whiteText">
            Play
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              onClick={() => {
                toggleModal();
                setModalType('create');
              }}
            >
              <i className="fas fa-plus fa-xs mr-2" />
              Create Room
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                toggleModal();
                setModalType('join');
              }}
            >
              <i className="fas fa-users mr-2 fa-xs" />
              Join Room
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UserInfoDropdown />
      </Nav>
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
  auth: PropTypes.object,
  toggleModal: PropTypes.func,
  setModalType: PropTypes.func
};
