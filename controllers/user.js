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

userRouter.get('/signup', (req, res) => {
  res.render('./user/signUp');
});

userRouter.route('/:userId')
  .get( (req, res) => {
    userApi.getUser(req.params.userId).then(
      user => res.send(user)
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .put( (req, res) => {
    userApi.updateUser(req.params.userId, req.body).then(
      () => res.sendStatus(200)
    ).catch(
      err => res.sendStatus(400)
    );
  })
  .delete( (req, res) => {
    userApi.deleteUser(req.params.userId).then(
      () => res.sendStatus(200)
    ).catch(
      () => res.sendStatus(400)
    )
  });

module.exports = {
  userRouter
};