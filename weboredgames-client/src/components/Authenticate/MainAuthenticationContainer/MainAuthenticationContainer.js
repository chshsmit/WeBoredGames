/**
* MainAuthenticationContainer.js
* @author Christopher Smith
* @description
* @created 2020-04-29T13:43:36.541Z-07:00
* @copyright
* @last-modified 2020-04-30T12:35:22.428Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import {
  Button,
  Form,
  Input,
  Label,
  Card,
  CardBody,
  Row
} from 'reactstrap';

import axios from 'axios';

import './MainAuthenticationContainer.css';

import CreateAccountModal from 'components/Authenticate/CreateAccountModal/CreateAccountModal';

// ----------------------------------------------------

const MainAuthenticationContainer = () => {


  // ----------------------------------------------------

  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [createOpen, toggleCreateAccount] = useState(false);

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

    axios.post('http://localhost:5000/api/auth/login', userData)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
      });
  };

  // ----------------------------------------------------

  const toggle = () => toggleCreateAccount(!createOpen);


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
                  onClick={() => toggle()}
                >
                  {`Don't have an account? Create one now.`}
                </Button>

                <hr className="my-4" />

                <Button
                  className="btn-block"
                  color="link"
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
        toggleVisibility={toggle}
      />
    </div>
  );
};

export default MainAuthenticationContainer;

// ----------------------------------------------------

MainAuthenticationContainer.propTypes = {

};
