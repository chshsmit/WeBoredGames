/**
* actions.js
* @author Christopher Smith
* @created 2020-05-02T17:17:45.644Z-07:00
* @copyright
* @last-modified 2020-05-03T12:59:02.245Z-07:00
*/

// ----------------------------------------------------

import {
  SET_AUTHENTICATED_USER,
  AUTHENTICATION_FAILED,
  RESET_ERRORS
} from './constants';

import axios from 'axios';
import setAuthToken from 'utils/setAuthToken';
import jwtDecode from 'jwt-decode';

// ----------------------------------------------------

export const loginUser = userData => dispatch => {
  axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/login`, userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwtDecode(token);
      dispatch(setAuthenticatedUser(decoded));
    }).catch(err => {
      dispatch(authenticationFailed(err.response.data));
    });
};

// ----------------------------------------------------

export const loginGuestUser = userData => dispatch => {
  axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/loginGuest`, userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setAuthenticatedUser(decoded));
    }).catch(err => {
      dispatch(authenticationFailed(err.response.data));
    });
};


// ----------------------------------------------------

export const setAuthenticatedUser = decoded => {
  return {
    type: SET_AUTHENTICATED_USER,
    payload: decoded
  };
};

// ----------------------------------------------------

export const authenticationFailed = errorData => {
  return {
    type: AUTHENTICATION_FAILED,
    payload: errorData
  };
};



// ----------------------------------------------------

export const resetErrors = () => dispatch => {
  dispatch({ type: RESET_ERRORS });
};
