import {
  SET_AUTHENTICATED_USER
} from './constants';


const initialState = {
  isAuthenticated: false,
  userData: {}
};

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
