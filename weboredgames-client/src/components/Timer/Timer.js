/**
* Timer.js
* @author Christopher Smith
* @description Timer component
* @created 2020-05-16T12:08:33.002Z-07:00
* @last-modified 2020-05-16T16:33:32.004Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import './Timer.css';

// ----------------------------------------------------

const Timer = ({ minutes, seconds, timerText }) => {
  let timerCountClass = minutes === 0 && seconds <= 10 ? "timer-almost-up" : "timer-still-good";

  return (
    <div className="timer-container">
      <h3 style={{color: "white"}}>{timerText}: </h3>
      <h3 className={`timer-count ${timerCountClass}`}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
    </div>
  );
};

export default Timer;


// ----------------------------------------------------

Timer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  timerText: PropTypes.string
};

Timer.defaultProps = {
  minutes: 1,
  seconds: 0,
  timerText: "Time Remaining"
};

// ----------------------------------------------------

// export default class Timer extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       minutes: props.defaultMinutes,
//       seconds: props.defaultSeconds
//     };
//   }

//   componentDidMount() {
//     this.myInterval = setInterval(() => {
//       const { minutes, seconds } = this.state;
//       if (seconds > 0) {
//         this.setState(({ seconds }) => ({
//           seconds: seconds - 1
//         }));
//       }

//       if (seconds === 0) {
//         if (minutes === 0) {
//           clearInterval(this.myInterval);
//         } else {
//           this.setState(({ minutes }) => ({
//             minutes: minutes - 1,
//             seconds: 59
//           }));
//         }
//       }

//     }, 1000);
//   }


//   render() {
//     const { minutes, seconds } = this.state;

//     let timerCountClass = minutes === 0 && seconds <= 10 ? "timer-almost-up" : "timer-still-good";

//     return (
//       <div className="timer-container">
//         <h3 style={{color: "white"}}>Time Remaining: </h3>
//         <h3 className={`timer-count ${timerCountClass}`}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
//       </div>
//     );
//   }

// }


// // ----------------------------------------------------

// Timer.propTypes = {
//   minutes: PropTypes.number,
//   seconds: PropTypes.number
// };

// Timer.defaultProps = {
//   minutes: 1,
//   seconds: 0
// };
