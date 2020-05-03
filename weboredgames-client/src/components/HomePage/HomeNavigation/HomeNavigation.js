/**
* HomeNavigation.js
* @author Christopher Smith
* @description The main navbar component
* @created 2020-05-02T22:19:20.242Z-07:00
* @last-modified 2020-05-03T12:58:52.792Z-07:00
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
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink
} from 'reactstrap';

import './HomeNavigation.css';

// -----------------------------------------------------------

const HomeNavigation = ({ auth, setModalType, toggleModal }) => {

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
        <NavItem id="whiteText">
          <NavLink onClick={() => console.log("User Info")} className="user-nav-info"><i className="fas fa-user-circle fa-2x" /></NavLink>
        </NavItem>
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
