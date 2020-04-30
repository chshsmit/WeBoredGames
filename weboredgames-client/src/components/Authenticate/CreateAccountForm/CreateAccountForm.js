/**
* CreateAccountForm.js
* @author Christopher Smith
* @description Form for the user to create an account
* @created 2020-04-30T10:45:48.681Z-07:00
* @last-modified 2020-04-30T12:25:49.305Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  Label,
  Input,
  FormFeedback
} from 'reactstrap';

import './CreateAccountForm.css';

// ----------------------------------------------------

const CreateAccountForm = ({ formValues, changeFormValue, passwordsMatch }) => {

  const changeValue = (event) => {
    changeFormValue({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="create-account-form-body">
      <Label htmlFor="fullName">Full Name</Label>
      <Input
        id="fullName"
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={changeValue}
        required
      />
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        onChange={changeValue}
        required
      />
      <Label htmlFor="passwordMain">Password</Label>
      <Input
        id="passwordMain"
        type="password"
        name="password"
        placeholder="Password"
        onChange={changeValue}
        required
      />
      <Label htmlFor="passwordConfirm">Confirm Password</Label>
      <Input
        id="passwordConfirm"
        type="password"
        name="confirmPassword"
        placeholder="Password"
        onChange={changeValue}
        valid={passwordsMatch && formValues.confirmPassword !== ""}
        invalid={!passwordsMatch && formValues.confirmPassword !== ""}
        required
      />
    </div>
  );

};

export default CreateAccountForm;

// ----------------------------------------------------

CreateAccountForm.propTypes = {
  formValues: PropTypes.object,
  changeFormValue: PropTypes.func,
  passwordsMatch: PropTypes.bool
};
