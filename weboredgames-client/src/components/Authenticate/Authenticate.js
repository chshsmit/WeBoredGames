/**
* Authenticate.js
* @author Christopher Smith
* @description
* @created 2020-04-29T13:43:36.541Z-07:00
* @copyright
* @last-modified 2020-04-29T14:16:54.151Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Form,
  Input,
  Label,
  Card,
  CardBody,
  Row
} from 'reactstrap';

import './Authenticate.css';

// ----------------------------------------------------

const Authenticate = ({}) => {

  return (
    <div className="main-auth-container">
      <Row>
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto justify-content-center">
          <Card className="card-signin my-5">
            <CardBody>
              <h5 className="card-title text-center">Sign In</h5>
              <Form className="form-signin">
                <div className="form-label-group">
                  <Input
                    type="email"
                    id="inputEmail"
                    placeholder="Email address"
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
                >
                  {`Don't have an account? Create one now.`}
                </Button>

                <hr className="my-4" />
                <Button
                  id="btnGoogle"
                  className="btn-block text-uppercase"
                  type="submit"
                >
                  <i className="fab fa-google mr-2" /> Sign in with Google
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default Authenticate;

// ----------------------------------------------------

Authenticate.propTypes = {

};
