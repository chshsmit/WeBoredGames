/**
* CodenamesTimer.js
* @author Christopher Smith
* @description The main timer component for Codenames
* @created 2020-05-16T20:10:50.134Z-07:00
* @last-modified 2020-05-16T20:36:17.312Z-07:00
*/

// ----------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Timer from 'components/Timer/Timer';

import './CodenamesTimer.css';

// ----------------------------------------------------

export default class CodenamesTimer extends Component {

  constructor(props) {
    super(props);

    let minutesAndSeconds = props.timer.timerActive ?
        props.timer.wantedTime.split(',') : [0,0];

    this.initialMinutes = Number(minutesAndSeconds[0]);
    this.initialSeconds = Number(minutesAndSeconds[1]);

    this.state = {
      minutes: Number(minutesAndSeconds[0]),
      seconds: Number(minutesAndSeconds[1])
    };

    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    const { timer, socket, userId, currentUserIsRoomLeader } = this.props;
    this.timerInterval = timer.timerActive ? setInterval(() => {
      const { minutes, seconds } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }

      if (seconds === 0) {
        if (minutes === 0) {
          if (currentUserIsRoomLeader) socket.emit("codenamesChangeTeamsTurn", { userId });
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }));
        }
      }
    }, 1000) : null;

    socket.on('resetTimer', () => {
      this.resetTimer();
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }


  resetTimer() {
    this.setState({
      minutes: this.initialMinutes,
      seconds: this.initialSeconds
    });
  }

  render() {
    const { minutes, seconds } = this.state;
    const { timer } = this.props;

    return timer.timerActive ? (
      <Timer
        minutes={minutes}
        seconds={seconds}
      />
    ) : (null);
  }
}

CodenamesTimer.propTypes = {
  timer: PropTypes.object,
  socket: PropTypes.object,
  userId: PropTypes.string,
  currentUserIsRoomLeader: PropTypes.bool
};
