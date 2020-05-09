/**
* PrivateRoute.js
* @author Christopher Smith
* @description Route that the user must be logged in to see
* @created 2020-05-02T17:13:46.019Z-07:00
* @last-modified 2020-05-09T12:09:00.670Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// ----------------------------------------------------

const PrivateRoute = ({ component: Component, auth, location, ...rest }) => {

  console.log(location);
  console.log(rest.computedMatch.path);

  return (
    <Route
      {...rest}
      render={props => auth.isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: "/", state: { from: location, fromRoom: rest.computedMatch.path === '/room/:roomId'}}} />}
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

// ----------------------------------------------------

PrivateRoute.propTypes = {
  component: PropTypes.any,
  auth: PropTypes.object
};
