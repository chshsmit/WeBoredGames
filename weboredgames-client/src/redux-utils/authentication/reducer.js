/**
* reducer.js
* @author Christopher Smith
* @description
* @created 2020-05-02T15:38:21.717Z-07:00
* @copyright Main reducer for authentication
* @last-modified 2020-05-02T16:03:53.049Z-07:00
*/

import {
} from './constants';



const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};


export default function authReducer(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {

    default:
      break;
  }

  return state;
}
