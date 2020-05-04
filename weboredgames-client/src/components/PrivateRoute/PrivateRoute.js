/**
* PrivateRoute.js
* @author Christopher Smith
* @description Route that the user must be logged in to see
* @created 2020-05-02T17:13:46.019Z-07:00
* @last-modified 2020-05-03T17:53:46.283Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// ----------------------------------------------------

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

// ----------------------------------------------------

PrivateRoute.propTypes = {
  component: PropTypes.any,
  auth: PropTypes.object
};
