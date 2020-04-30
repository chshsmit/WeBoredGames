/**
* setup.js
* @author Christopher Smith
* @description
* @created 2020-04-29T16:43:19.879Z-07:00
* @copyright
* @last-modified 2020-04-30T12:17:01.910Z-07:00
*/

// ----------------------------------------------------

const bcrypt = require('bcrypt');
const User = require('../models/User/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// ----------------------------------------------------

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

// ----------------------------------------------------

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// ----------------------------------------------------

// Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    // Match the user
    User.findOne({ _email: email })
      .then(user => {
        // If there is no user then this fails
        if (!user) {
          done(null, false, { message: "This email does not have an account" });
        } else {
          // Match Password
          bcrypt.compare(password, user._password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect Credentials" });
            }
          });
        }
      })
      .catch(err => {
        return done(null, false, { message: err });
      });
  })
);

module.exports = passport;
