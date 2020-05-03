/**
* reducer.js
* @author Christopher Smith
* @description Reducer for authentication and user data
* @created 2020-05-02T17:17:49.719Z-07:00
* @last-modified 2020-05-03T12:35:06.017Z-07:00
*/

import {
  SET_AUTHENTICATED_USER,
  AUTHENTICATION_FAILED,
  RESET_ERRORS
} from './constants';

// ----------------------------------------------------

const initialState = {
  isAuthenticated: false,
  userData: {},
  authenticationError: false,
  errorMessage: ""
};

// ----------------------------------------------------

export default function authReducer(state=initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case SET_AUTHENTICATED_USER:
      state = {
        isAuthenticated: true,
        userData: payload,
        authenticationError: false,
        errorMessage: ""
      };
      break;

    case AUTHENTICATION_FAILED:
      state = {
        isAuthenticated: false,
        authenticationError: true,
        errorMessage: payload.error
      };
      break;

    case RESET_ERRORS:
      state = {
        ...state,
        authenticationError: false,
        errorMessage: ""
      };
      break;

    default:
      break;
  }

  return state;
}
