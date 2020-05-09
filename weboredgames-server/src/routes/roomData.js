/**
* roomData.js
* @author Christopher Smith
* @description Getting room data
* @created 2020-05-09T12:19:29.983Z-07:00
* @last-modified 2020-05-09T12:28:35.276Z-07:00
*/


// ----------------------------------------------------

const express = require('express');
const Room = require('../models/Room/Room');

const roomRouter = express.Router();

// ----------------------------------------------------

roomRouter.get('/getRoomData/:roomId', (req, res) => {
  console.log(req.params.roomId);
  Room.find()
    .where('_roomId').equals(req.params.roomId)
    .exec()
    .then(result => {
      if (!result) res.status(404).json({error: "This room does not exist"});

      res.status(200).json(result);
    });

});



module.exports = roomRouter;
