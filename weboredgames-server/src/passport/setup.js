/**
* setup.js
* @author Christopher Smith
* @description
* @created 2020-04-29T16:43:19.879Z-07:00
* @copyright
* @last-modified 2020-04-30T10:33:03.516Z-07:00
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
        //Create new user
        if (!user) {
          const newUser = new User({ _email: email, _password: password });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser._password, salt, (err, hash) => {
              if (err) throw err;
              newUser._password = hash;
              newUser.save()
                .then(user => {
                  // console.log(user);
                  return done(null, user);
                })
                .catch(err => {
                  console.log("Is there an error")
                  console.log(err);
                  return done(null, false, { message: err });
                });
            });
          });
        } else {
          // Match Password
          bcrypt.compare(password, user._password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Wrong Password" });
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
