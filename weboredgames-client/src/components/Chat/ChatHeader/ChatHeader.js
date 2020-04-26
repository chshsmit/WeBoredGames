/**
* ChatHeader.js
* @author Christopher Smith
* @description
* @created 2020-04-11T17:50:51.043Z-07:00
* @last-modified 2020-04-15T18:24:07.828Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import './ChatHeader.css';

// ----------------------------------------------------

const ChatHeader = ({ room, allUsers }) => {

  const [usersOpen, setUsersOpen] = useState(false);

  const toggleUsers = () => setUsersOpen(!usersOpen);

  let menuItems = allUsers.map((user) => (
    <React.Fragment key={user._name}>
      <h5 className="dropdown-item" id="usersDropdownItem">{user._name}</h5>
      <DropdownItem divider />
    </React.Fragment>
  ));

  return (
    <div className="chatHeader">
      <div className="leftInnerContainer">
        <h3>{room} Chat</h3>
      </div>

      <Dropdown isOpen={usersOpen} toggle={toggleUsers} className="rightInnerContainer">
        <DropdownToggle className="dropdown-toggle-icon" id="dropdownToggleIcon">
          {allUsers.length} <i className="fas fa-users mr-1 ml-1 mt-1 fa-lg" />
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem header>Users</DropdownItem>
          <DropdownItem divider />
          {menuItems}
        </DropdownMenu>
      </Dropdown>
    </div>
  );

};

// ----------------------------------------------------

export default ChatHeader;

ChatHeader.propTypes = {
  room: PropTypes.string,
  allUsers: PropTypes.array
};
