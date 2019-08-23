const express = require('express');

const fandomApi = require('../models/db-fandom.js');
const fandomModelApi = require('../models/fandommodel.js');

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
    fandomModelApi.getAllFandomData(req.params.fandomId).then(
      allFandomData => res.render('./fandom/fandomProfile', allFandomData )
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