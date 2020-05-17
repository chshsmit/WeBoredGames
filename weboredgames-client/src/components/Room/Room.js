/**
* Room.js
* @author Christopher Smith
* @description Main room component
* @created 2020-04-11T11:38:00.397Z-07:00
* @last-modified 2020-05-16T19:56:06.745Z-07:00
*/

// ----------------------------------------------------

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import MainChatContainer from 'components/Chat/MainChatContainer/MainChatContainer';
import ChatCollapse from 'components/Chat/ChatCollapse/ChatCollapse';
import MainGameSelectionContainer from 'components/GameSelection/MainGameSelectionContainer/MainGameSelectionContainer';
import { determineGame } from './determineGameComponent';

import './Room.css';

let socket;
const ENDPOINT = process.env.REACT_APP_SERVER_CONNECT || 'http://localhost:5000/';

// ----------------------------------------------------

const Room = ({ location }) => {

  const [room, setRoom] = useState('');
  const [roomData, setRoomData] = useState(null);
  const [joinError, setJoinError] = useState(false);
  const [chatVisible, setChatVisibility] = useState(true);
  const [activeGame, setActiveGame] = useState(null);

  const { userData, roomName, type, roomCodeWord } = location.state;

  useEffect(() => {

    socket = io(ENDPOINT);

    setRoom(roomName);

    if (type === 'create') {
      socket.emit('createRoom', { userData: userData, room: roomName, roomCodeWord }, (data) => {
        const { error, newRoom } = data;

        if (error) {
          alert(error);
          setJoinError(true);

        } else {
          setRoomData(newRoom);
          setJoinError(false);
        }
      });
    }

    if (type === "join") {
      socket.emit("joinRoom", { userData , room: roomName, roomCodeWord }, (data) => {
        const { roomData, error } = data;
        if (error) {
          alert(error);
          setJoinError(true);
        } else {
          setRoomData(roomData);
          setJoinError(false);
        }
      });
    }

    return () => {
      socket.emit('disconnect');
      socket.off();
    };

  }, [userData, roomName, type]);

  useEffect(() => {
    socket.on('newRoomData', ({ roomData }) => {
      setRoomData(roomData);
    });
  }, [roomData]);

  useEffect(() => {
    socket.on('newGameData', ({ activeGame }) => {
      setActiveGame(activeGame);
    });
  });

  const setActiveGameInRoom = (gameName) => {
    socket.emit('setNewGame', { gameName, room }, ({activeGame}) => {
      setActiveGame(activeGame);
    });
  };

  if (joinError) return <Redirect to="/" />;

  let gamePlayContainer = roomData === null || activeGame === null ? (
    <MainGameSelectionContainer socket={socket} setActiveGame={setActiveGameInRoom} />
  ) : (
    determineGame(roomData, activeGame, {name: userData._name, room, userId: userData._id}, socket)
  );

  return (
    <div className="main-room-container">
      <div className="gameplay-container">
        {gamePlayContainer}
      </div>

      <ChatCollapse
        setChatVisibility={setChatVisibility}
        chatVisible={chatVisible}
      />

      <div
        id="mainChatColumn"
        className={`chat-container chat-${chatVisible ? 'open' : 'hidden'}`}
      >
        {socket && (
          <MainChatContainer
            room={room}
            roomUserData={roomData ? roomData._users : []}
            socket={socket}
            name={userData._name}
            currentUserId={userData._id}
          />
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------

export default Room;

Room.propTypes = {
  location: PropTypes.object
};

