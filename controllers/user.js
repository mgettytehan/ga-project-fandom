const express = require('express');

const userApi = require('../models/user.js');

const userRouter = express.Router();

userRouter.route('/')
  .get( (req, res) => {
    userApi.getAllUsers().then(
      users => res.send(users)
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .post( (req, res) => {
    userApi.addUser(req.body).then(
      () => res.sendStatus(201)
    ).catch(
      () => res.sendStatus(400)
    );
  });

module.exports = {
  userRouter
};