/**
* UserInfoDropdown.js
* @author Christopher Smith
* @description User Info Dropdown Component
* @created 2020-05-03T17:30:27.509Z-07:00
* @last-modified 2020-05-03T17:46:00.436Z-07:00
*/

// -----------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import './UserInfoDropdown.css';

import { logoutUser } from 'redux-utils/authentication/actions';

// -----------------------------------------------------------

const UserInfoDropdown = ({ logoutUser }) => {

  const logUserOut = () => {
    logoutUser();
    window.location.href = '/';
  };


  return (
    <UncontrolledDropdown nav>
      <DropdownToggle nav>
        <i className="fas fa-user-circle fa-2x user-info-toggle" />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={logUserOut}>
          <i className="fas fa-sign-out-alt mr-2" />
          Logout
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

};

// -----------------------------------------------------------

const dispatchFunctions = {
  logoutUser
};

export default connect(null, dispatchFunctions)(UserInfoDropdown);

// -----------------------------------------------------------

UserInfoDropdown.propTypes = {
  logoutUser: PropTypes.func
};
