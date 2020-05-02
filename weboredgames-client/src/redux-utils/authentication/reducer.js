/**
* reducer.js
* @author Christopher Smith
* @description
* @created 2020-05-02T15:38:21.717Z-07:00
* @copyright Main reducer for authentication
* @last-modified 2020-05-02T15:39:43.694Z-07:00
*/

import {

} from './constants';



const initialState = {

};


export default function authReducer(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    default:
      break;
  }

  return state;
}
