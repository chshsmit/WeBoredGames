/**
* store.js
* @author Christopher Smith
* @description Main redux store
* @created 2020-05-02T17:15:13.314Z-07:00
* @last-modified 2020-05-02T17:45:21.957Z-07:00
*/

// ----------------------------------------------------

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from 'redux-utils/authentication/reducer';

// ----------------------------------------------------

const rootReducer = combineReducers({
  auth: authReducer
});

// ----------------------------------------------------

const middleware = [thunk];

const store = createStore(rootReducer, {}, compose(applyMiddleware(...middleware)));

export default store;
