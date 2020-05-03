/**
* setup.js
* @author Christopher Smith
* @description
* @created 2020-04-29T16:43:19.879Z-07:00
* @copyright
* @last-modified 2020-05-02T14:56:00.401Z-07:00
*/

// ----------------------------------------------------

const bcrypt = require('bcrypt');
const User = require('../models/User/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');


// ----------------------------------------------------

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SESSION_SECRET_KEY;

// Local Strategy
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

module.exports = passport;
