/**
* Message.js
* @author Christopher Smith
* @description
* @created 2020-04-11T21:59:05.403Z-07:00
* @copyright
* @last-modified 2020-04-13T18:52:03.470Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import './Message.css';

// ----------------------------------------------------

const Message = ({ currentUser, message: { message, name } }) => (
  currentUser === name ? (
    <div className="message-container justifyEnd">
      <p className="sent-text pr-10">{name}</p>
      <div className="message-box sent-message-bg">
        <p className="message-text message-color-white">{message}</p>
      </div>
    </div>
  ) : (
    <div className="message-container justify-message-start">
      <div className="message-box received-message-bg">
        <p className="message-text message-color-dark">{message}</p>
      </div>
      <p className="sent-text pl-10">{name}</p>
    </div>
  )
);


// ----------------------------------------------------

export default Message;

Message.propTypes = {
  currentUser: PropTypes.string,
  message: PropTypes.object
};
