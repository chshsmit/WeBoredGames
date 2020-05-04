/**
* ChatInput.js
* @author Christopher Smith
* @description Main input box for sending messages
* @created 2020-04-11T21:28:11.591Z-07:00
* @copyright
* @last-modified 2020-05-04T16:20:45.225Z-07:00
*/

// ----------------------------------------------------

import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  InputGroup,
  Button,
  InputGroupAddon
} from 'reactstrap';

import './ChatInput.css';


// ----------------------------------------------------

const ChatInput = ({ socket, name , userId}) => {
  const [message, setMessage] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) socket.emit('sendMessage', { message, name, userId }, () => setMessage(''));
  };

  return (
    <InputGroup className="chat-input">
      <Input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <InputGroupAddon addonType="append">
        <Button color="success" onClick={(event) => sendMessage(event)}>Send</Button>
      </InputGroupAddon>
    </InputGroup>
  );
};


// ----------------------------------------------------

export default ChatInput;

ChatInput.propTypes = {
  socket: PropTypes.object,
  name: PropTypes.string,
  userId: PropTypes.string
};
