/**
* health.js
* @author Christopher Smith
* @description Simple Ping Route to check that the server is running
* @created 2020-04-11T10:53:54.148Z-07:00
* @last-modified 2020-04-11T10:55:34.737Z-07:00
*/

// ------------------------------------------------------------------------

const express = require('express');
const health = express.Router();


// ------------------------------------------------------------------------

health.get('/', (req, res) => {
  res.send('Server is up and running');
});

// ------------------------------------------------------------------------

module.exports = health;
