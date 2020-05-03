/**
* reducer.js
* @author Christopher Smith
* @description Reducer for authentication and user data
* @created 2020-05-02T17:17:49.719Z-07:00
* @last-modified 2020-05-02T17:45:02.104Z-07:00
*/

import {
  SET_AUTHENTICATED_USER
} from './constants';

// ----------------------------------------------------

const initialState = {
  isAuthenticated: false,
  userData: {}
};

// ----------------------------------------------------

export default function authReducer(state=initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case SET_AUTHENTICATED_USER:
      console.log(payload);
      state = {
        isAuthenticated: true,
        userData: payload
      };
      break;

    default:
      break;
  }

  return state;
}
