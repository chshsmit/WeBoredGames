/**
* Messages.js
* @author Christopher Smith
* @description Scroll container that holds all of the chat messages
* @created 2020-04-11T21:57:21.494Z-07:00
* @last-modified 2020-04-20T13:34:29.909Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import PropTypes from 'prop-types';

import Message from 'components/Chat/Messages/Message/Message';

import './Messages.css';

// ----------------------------------------------------

const Messages = ({ messages, currentUser }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, index) => (
      <div key={index}>
        <Message
          message={message}
          currentUser={currentUser}
        />
      </div>
    ))}
  </ScrollToBottom>
);


// ----------------------------------------------------

export default Messages;

Messages.propTypes = {
  messages: PropTypes.array,
  users: PropTypes.array,
  currentUser: PropTypes.string
};
