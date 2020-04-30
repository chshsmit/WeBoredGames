/**
* CreateAccountForm.js
* @author Christopher Smith
* @description Form for the user to create an account
* @created 2020-04-30T10:45:48.681Z-07:00
* @last-modified 2020-04-30T10:55:10.383Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  Label,
  Input
} from 'reactstrap';

import './CreateAccountForm.css';

// ----------------------------------------------------

const CreateAccountForm = () => {

  return (
    <div className="create-account-form-body">
      <Label htmlFor="fullName">Full Name</Label>
      <Input
        id="fullName"
        type="text"
        name="name"
        placeholder="Full Name"
        required
      />
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <Label htmlForm="passwordMain">Password</Label>
      <Input
        id="passwordMain"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <Label htmlForm="passwordConfirm">Confirm Password</Label>
      <Input
        id="passwordConfirm"
        type="password"
        name="confirmPassword"
        placeholder="Password"
        required
      />
    </div>
  );

};

export default CreateAccountForm;

// ----------------------------------------------------

CreateAccountForm.propTypes = {

};
