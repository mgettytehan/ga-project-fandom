const express = require('express');

const userApi = require('../models/db-user.js');
const userModelApi = require('../models/usermodel.js');

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
  //user view requires user's fandoms
  .get( (req, res) => {
    userApi.getUser(req.params.userId).then(
      user => {
        userModelApi.getFandomsByUserId(user._id).then(
          fandoms => res.render('./user/userProfile.hbs', { user, fandoms } )
        )
      }
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .put( (req, res) => {
    userApi.updateUser(req.params.userId, req.body).then(
      () => res.sendStatus(200)
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .delete( (req, res) => {
    userApi.deleteUser(req.params.userId).then(
      () => res.sendStatus(200)
    ).catch(
      () => res.sendStatus(400)
    )
  });

userRouter.get('/:userId/edit', (req, res) => {
  userApi.getUser(req.params.userId).then(
    user => res.render('./user/edit.hbs', { user })
  )
});

userRouter.get('/:userId/editFandoms', (req, res) => {
  userModelApi.getFandomsInAndNotIn(req.params.userId).then(
    fandomCollection => {
      res.render('./user/addFandoms.hbs', fandomCollection);
    }
  )
});

module.exports = {
  userRouter
};