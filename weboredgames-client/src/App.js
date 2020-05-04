/**
 * App.js
 * @author Christopher Smith
 * @description The main links for the application
 * @created 2020-04-10T21:30:05.300Z-07:00
 * @last-modified 2020-05-03T17:46:23.087Z-07:00
*/

// ----------------------------------------------------

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from 'redux-utils/store';
import setAuthToken from 'utils/setAuthToken';
import { setAuthenticatedUser, logoutUser } from 'redux-utils/authentication/actions';
import jwtDecode from 'jwt-decode';

import Home from 'components/HomePage/Home/Home';
import Room from "components/Room/Room";
import MainAuthenticationContainer from 'components/Authenticate/MainAuthenticationContainer/MainAuthenticationContainer';


// ----------------------------------------------------

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwtDecode(token);
  store.dispatch(setAuthenticatedUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get milliseconds
  if (decoded.exp < currentTime) {
    // Logout and return to sign in screen
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

// ----------------------------------------------------

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={MainAuthenticationContainer} />
      <Route path="/home" exact render={(props) => <Home {...props} />} />
      <Route path="/room" exact component={Room} />
    </Router>
  </Provider>
);

export default App;
