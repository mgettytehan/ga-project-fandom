const express = require('express');

const { userApi } = require('../models/db-user.js');
const userModelApi = require('../models/usermodel.js');

const userRouter = express.Router();

userRouter.route('/')
  .get( (req, res) => {
    userApi.getAll().then(
      users => res.render('./user/userList.hbs', { users })
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .post( (req, res) => {
    userApi.addDocs(req.body).then(
      () => res.redirect('/')
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
    userApi.getById(req.params.userId).then(
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
    userApi.updateDoc(req.params.userId, req.body).then(
      () => res.redirect(`/users/${req.params.userId}`)
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .delete( (req, res) => {
    userApi.deleteDoc(req.params.userId).then(
      () => res.redirect('/')
    ).catch(
      () => res.sendStatus(400)
    )
  });

userRouter.get('/:userId/edit', (req, res) => {
  userApi.getById(req.params.userId).then(
    user => res.render('./user/edit.hbs', { user })
  )
});

userRouter.route('/:userId/editFandoms')
  .get((req, res) => {
    userModelApi.getFandomsInAndNotIn(req.params.userId).then(
      fandomCollection => {
        res.render('./user/addFandoms.hbs', fandomCollection);
      }
    )
  })
  .post((req, res) => {
    userModelApi.addFandomsToUser(req.params.userId, req.body).then(
      () => res.redirect(`/users/${req.params.userId}`)
    )
  })
  .delete((req, res) => {
    userModelApi.removeFandomsFromUser(req.params.userId, req.body).then(
      () => res.redirect(`/users/${req.params.userId}`)
    )
  });

module.exports = {
  userRouter
};