/**
* HomeNavigation.js
* @author Christopher Smith
* @description The main navbar component
* @created 2020-05-02T22:19:20.242Z-07:00
* @last-modified 2020-05-02T22:56:53.556Z-07:00
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
  Collapse,
  NavbarToggler,
  Dropdown
} from 'reactstrap';

import './HomeNavigation.css';

// -----------------------------------------------------------

const HomeNavigation = ({ auth }) => {

  console.log(auth);

  return (
    <Navbar color="light" light id="mainNavbar">
      <NavbarBrand href="/home">WeBoredGames</NavbarBrand>
      <Collapse isOpen>
        <Nav navbar>
          <Dropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Collapse>
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
