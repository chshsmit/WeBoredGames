/**
* actions.js
* @author Christopher Smith
* @description
* @created 2020-05-02T17:17:45.644Z-07:00
* @copyright
* @last-modified 2020-05-02T17:33:39.394Z-07:00
*/


import {
  SET_AUTHENTICATED_USER
} from './constants';

import axios from 'axios';
import setAuthToken from 'utils/setAuthToken';
import jwtDecode from 'jwt-decode';

export const loginUser = userData => dispatch => {
  axios.post("http://localhost:5000/api/auth/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwtDecode(token);
      dispatch(setAuthenticatedUser(decoded));
    });
};

export const setAuthenticatedUser = decoded => {
  return {
    type: SET_AUTHENTICATED_USER,
    payload: decoded
  };
};

