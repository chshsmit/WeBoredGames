import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from 'redux-utils/authentication/reducer';


const rootReducer = combineReducers({
  auth: authReducer
});

const middleware = [thunk];

const store = createStore(rootReducer, {}, compose(applyMiddleware(...middleware)));

export default store;
