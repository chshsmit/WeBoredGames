/**
* ChatCollapse.js
* @author Christopher Smith
* @description Collapse sidebar for chat
* @created 2020-04-15T13:49:53.964Z-07:00
* @last-modified 2020-04-26T15:12:10.502Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import './ChatCollapse.css';


// ----------------------------------------------------

const ChatCollapse = ({setChatVisibility, chatVisible}) => (
  <div className="collapse-chat" onClick={() => setChatVisibility(!chatVisible)}>
    <div className="chat-collapse-icon">
      <i className={`fas fa-arrow-${chatVisible ? 'right' : 'left'}`} />
    </div>
  </div>
);


export default ChatCollapse;

ChatCollapse.propTypes = {
  setChatVisibility: PropTypes.func,
  chatVisible: PropTypes.bool
};
