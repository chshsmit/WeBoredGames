/**
* ActivateTimer.js
* @author Christopher Smith
* @description Component to activate the timer for Codenames
* @created 2020-05-16T16:46:21.564Z-07:00
* @last-modified 2020-05-16T17:09:16.276Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  CustomInput,
  Input
} from 'reactstrap';

// ----------------------------------------------------

const ActivateTimer = ({ timerActive, setTimerStatus, timerLength, changeTimerLength }) => {

  return (
    <>
      <CustomInput
        type="switch"
        id="timerSwitchId"
        name="timerSwitch"
        label="Activate Timer"
        color="white"
        checked={timerActive}
        onChange={() => setTimerStatus(!timerActive)}
      />
      {timerActive && (
        <Input
          value={timerLength}
          type="select"
          placeholder="Set timer length"
          id="timeSelect"
          onChange={(event) => {
            changeTimerLength(event.target.value);
          }}
        >
          <option value="" disabled>Select Timer Length</option>
          <option value="0,30">30 Seconds</option>
          <option value="1,0">1 Minute</option>
          <option value="1,30">1 Minute 30 Seconds</option>
          <option value="2,0">2 minutes</option>
          <option value="3,0">3 Minutes</option>
        </Input>
      )}
    </>
  );
};

export default ActivateTimer;

ActivateTimer.propTypes = {
  timerActive: PropTypes.bool,
  setTimerStatus: PropTypes.func,
  timerLength: PropTypes.string
};

ActivateTimer.defaultProps = {
  timerLength: ""
}
