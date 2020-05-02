import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import promise from 'redux-promise-middleware';

import authReducer from 'redux-utils/authentication/reducer';

const rootReducer = combineReducers({
  auth: authReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancer(applyMiddleware(promise)));

export default store;
