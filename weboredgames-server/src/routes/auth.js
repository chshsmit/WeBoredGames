/**
* auth.js
* @author Christopher Smith
* @description Routes to handle registration and authentication
* @created 2020-04-29T16:53:26.856Z-07:00
* @last-modified 2020-05-03T17:57:13.757Z-07:00
*/

// ----------------------------------------------------

const express = require('express');
const User = require('../models/User/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongooseId = require('mongoose').Types.ObjectId;

const authRouter = express.Router();

// ----------------------------------------------------

authRouter.post('/loginGuest', (req, res) => {
  const { userName } = req.body;

  const payload = {
    _id: mongooseId(),
    _name: userName
  };

  // The guest token expires in 1 day
  jwt.sign(
    payload,
    process.env.SESSION_SECRET_KEY,
    {
      expiresIn: 86400
    },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    }
  );
});


// ----------------------------------------------------

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ _email: email }).then(user => {
    if (!user) return res.status(404).json({ error: "Email not found" });

    bcrypt.compare(password, user._password).then(isMatch => {
      if (isMatch) {
        const payload = {
          _id: user._id,
          _name: user._name,
          _email: user._email,
          _firstName: user._firstName,
          _lastName: user._lastName
        };

        jwt.sign(
          payload,
          process.env.SESSION_SECRET_KEY,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ error: "Incorrect Credentials" });
      }
    });
  });
});


// ----------------------------------------------------

authRouter.post('/register', (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    userName,
  } = req.body;

  User.findOne({ _email: email }).then(user => {
    if (user) return res.status(400).json({ error: "Email already exists" });

    const newUser = new User({
      _firstName: firstName,
      _lastName: lastName,
      _name: userName,
      _email: email,
      _password: password
    });

    // Hashing password before saving
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser._password, salt, (err, hash) => {
        if (err) throw err;
        newUser._password = hash;
        newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});



// ----------------------------------------------------

module.exports = authRouter;
