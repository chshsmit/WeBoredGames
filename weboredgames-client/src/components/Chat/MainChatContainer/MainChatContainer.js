/**
* MainChatContainer.js
* @author Christopher Smith
* @description Main chat feature
* @created 2020-04-11T17:37:31.415Z-07:00
* @last-modified 2020-05-04T16:20:24.088Z-07:00
*/

// ----------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChatHeader from 'components/Chat/ChatHeader/ChatHeader';
import Messages from 'components/Chat/Messages/Messages';
import ChatInput from 'components/Chat/ChatInput/ChatInput';

import './MainChatContainer.css';


// ----------------------------------------------------

class MainChatContainer extends Component {

  constructor() {
    super();

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('message', (message) => {
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }

  render() {
    const { room, name, socket, roomUserData, currentUserId } = this.props;
    const { messages } = this.state;

    return (
      <div id="mainChatContainer">
        <ChatHeader room={room} allUsers={roomUserData} />
        <Messages
          messages={messages}
          currentUser={name}
        />
        <ChatInput
          socket={socket}
          name={name}
          userId={currentUserId}
        />
      </div>
    );
  }
}


// ----------------------------------------------------

export default MainChatContainer;

MainChatContainer.propTypes = {
  room: PropTypes.string,
  name: PropTypes.string,
  socket: PropTypes.any,
  roomUserData: PropTypes.array,
  currentUserId: PropTypes.string
};

