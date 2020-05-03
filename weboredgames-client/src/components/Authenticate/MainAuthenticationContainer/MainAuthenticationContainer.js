/**
* MainAuthenticationContainer.js
* @author Christopher Smith
* @description
* @created 2020-04-29T13:43:36.541Z-07:00
* @copyright
* @last-modified 2020-05-03T12:52:00.866Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loginUser, resetErrors, loginGuestUser } from 'redux-utils/authentication/actions';
import {
  Button,
  Form,
  Input,
  Label,
  Card,
  CardBody,
  Row
} from 'reactstrap';

import { Redirect } from 'react-router-dom';

import './MainAuthenticationContainer.css';

import CreateAccountModal from 'components/Authenticate/CreateAccountModal/CreateAccountModal';
import GuestAuthentication from 'components/Authenticate/GuestAuthentication/GuestAuthentication';

// ----------------------------------------------------

const MainAuthenticationContainer = (props) => {


  // ----------------------------------------------------

  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [createOpen, toggleCreateAccount] = useState(false);
  const [guestOpen, toggleGuestAccount] = useState(false);

  // ----------------------------------------------------
  // Functions
  // ----------------------------------------------------

  // ----------------------------------------------------

  const onSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email,
      password
    };

    props.loginUser(userData);
  };

  // ----------------------------------------------------

  const toggleCreate = () => toggleCreateAccount(!createOpen);

  const toggleGuest = () => toggleGuestAccount(!guestOpen);



  // ----------------------------------------------------

  if (props.auth.isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/home"
        }}
      />
    );
  }

  if (props.auth.authenticationError) {
    alert(props.auth.errorMessage);
    props.resetErrors();
  }

  // ----------------------------------------------------

  return (
    <div className="main-auth-container">
      <Row>
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto justify-content-center">
          <Card className="card-signin my-5">
            <CardBody>
              <h5 className="card-title text-center">Sign In</h5>
              <Form onSubmit={onSubmit} className="form-signin">
                <div className="form-label-group">
                  <Input
                    type="email"
                    id="inputEmail"
                    placeholder="Email address"
                    onChange={(event) => changeEmail(event.target.value)}
                    required
                    autoFocus
                  />
                  <Label htmlFor="inputEmail">Email address</Label>
                </div>

                <div className="form-label-group">
                  <Input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    onChange={(event) => changePassword(event.target.value)}
                    required
                  />
                  <Label htmlFor="inputPassword">Password</Label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                </div>
                <Button
                  className="btn-block text-uppercase"
                  type="submit"
                  color="primary"
                  size="lg"
                >
                  Sign in
                </Button>

                <Button
                  color="link"
                  className="btn-block"
                  onClick={() => toggleCreate()}
                >
                  {`Don't have an account? Create one now.`}
                </Button>

                <hr className="my-4" />

                <Button
                  className="btn-block"
                  color="link"
                  onClick={() => toggleGuest()}
                >
                  Continue as guest
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Row>
      <CreateAccountModal
        isOpen={createOpen}
        toggleVisibility={toggleCreate}
      />
      <GuestAuthentication
        isOpen={guestOpen}
        toggle={toggleGuest}
        authenticateGuest={props.loginGuestUser}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { loginUser, resetErrors, loginGuestUser })(MainAuthenticationContainer);

// ----------------------------------------------------

MainAuthenticationContainer.propTypes = {
  loginUser: PropTypes.func,
  auth: PropTypes.object,
  resetErrors: PropTypes.func,
  loginGuestUser: PropTypes.func
};
