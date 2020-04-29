/**
 * App.js
 * @author Christopher Smith
 * @description The main links for the application
 * @created 2020-04-10T21:30:05.300Z-07:00
 * @last-modified 2020-04-29T13:48:13.635Z-07:00
 */

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from 'components/LandingPage/Join/Join';
import Room from "components/Room/Room";
import Authenticate from 'components/Authenticate/Authenticate';

const App = () => (
  <Router>
    <Route path="/" exact component={Authenticate} />
    <Route path="/home" exact component={Join} />
    <Route path="/room" exact component={Room} />
  </Router>
);

export default App;
