/**
* auth.js
* @author Christopher Smith
* @description Routes to handle registration and authentication
* @created 2020-04-29T16:53:26.856Z-07:00
* @last-modified 2020-04-30T12:18:45.045Z-07:00
*/

// ----------------------------------------------------

const express = require('express');
const passport = require('passport');
const User = require('../models/User/User');
const bcrypt = require('bcrypt');

const authRouter = express.Router();

// ----------------------------------------------------

authRouter.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(400).json({ errors: err });

    console.log(user);
    console.log(info);
    if (!user) return res.status(400).json({ error: info.message });

    req.logIn(user, (err) => {
      if (err) return res.status(400).json({ error: err });
      return res.status(200).json({ success: `logged in ${user.id}`});
    });
  })(req, res, next);
});


// ----------------------------------------------------

authRouter.post('/register', (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  // First be sure there are no users with the same email
  User.findOne({ _email: email })
    .then(user => {
      if (!user) {
        console.log("We can create an account");
        const newUser = new User({ _email: email, _name: name, _password: password });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser._password, salt, (err, hash) => {
            if (err) throw err;
            newUser._password = hash;
            newUser.save()
              .then(user => {
                res.status(201).send({ userData: user, message: "Success" });
              })
              .catch(err => {
                console.log("There is an error");
                console.log(err);
                res.status(404).send({ error: "There was an error processing the request." });
              });
          });
        });
      } else {
        res.status(404).send({ error: "User already exists with that email." });
      }
    });
});



// ----------------------------------------------------

module.exports = authRouter;
