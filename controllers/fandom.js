const express = require('express');

const fandomApi = require('../models/fandom.js');
const fandomUserApi = require('../models/fandomuser.js');

const fandomRouter = express.Router();

fandomRouter.route('/')
  .get( (req, res) => {
    fandomApi.getAllFandoms().then(
      fandoms => res.send(fandoms)
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .post( (req, res) => {
    fandomApi.addFandom(req.body).then(
      () => res.sendStatus(201)
    ).catch(
      () => res.sendStatus(400)
    );
  });

fandomRouter.route('/:fandomId')
  //fandom view requires users belonging to fandom
  .get( (req, res) => {
    fandomApi.getFandom(req.params.fandomId).then(
      fandom => {
        fandomUserApi.getUsersByFandomId(fandom._id).then(
          users => res.send( { fandom, users } )
        )
      }
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .put( (req, res) => {
    fandomApi.updateFandom(req.params.fandomId, req.body).then(
      () => res.sendStatus(200)
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .delete( (req, res) => {
    fandomApi.deleteFandom(req.params.fandomId).then(
      () => res.sendStatus(200)
    ).catch(
      () => res.sendStatus(400)
    )
  });

fandomRouter.get('/:fandomId/edit', (req, res) => {
  fandomApi.getFandom(req.params.fandomId).then(
    fandom => res.send(fandom)
  )
});

module.exports = {
  fandomRouter
};