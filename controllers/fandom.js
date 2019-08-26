const express = require('express');

const { fandomApi } = require('../models/db-fandom.js');
const fandomModelApi = require('../models/fandommodel.js');

const fandomRouter = express.Router();

fandomRouter.route('/')
  .get( (req, res) => {
    fandomModelApi.getAllFandomsSorted().then(
      fandoms => res.render('./fandom/fandomList', { title: 'Fandoms', fandoms })
    )
  })
  .post( (req, res) => {
    fandomApi.addDocs(req.body).then(
      () => res.redirect('/fandoms/admin')
    ).catch(
      () => res.sendStatus(400)
    );
  });

fandomRouter.get('/admin', (req, res) => {
  fandomModelApi.getFandomsAndMediaTypes().then(
    fandomsAndMedia => {
      //add page title
      fandomsAndMedia.title = "Edit Fandoms";
      res.render('./admin/fandoms.hbs', fandomsAndMedia);
    }
  ).catch(
    () => res.sendStatus(400)
  );
});

fandomRouter.route('/:fandomId')
  //fandom view requires users belonging to fandom
  .get( (req, res) => {
    fandomModelApi.getAllFandomData(req.params.fandomId).then(
      allFandomData => {
        allFandomData.title = allFandomData.fandom.mediaName;
        res.render('./fandom/fandomProfile', allFandomData );
    }
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .put( (req, res) => {
    fandomApi.updateDoc(req.params.fandomId, req.body).then(
      () => res.redirect('/fandoms/admin')
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .delete( (req, res) => {
    fandomApi.deleteDoc(req.params.fandomId).then(
      () => res.redirect('/fandoms/admin')
    ).catch(
      () => res.sendStatus(400)
    )
  });

fandomRouter.get('/:fandomId/edit', (req, res) => {
  fandomModelApi.getFandomAndMediaTypes(req.params.fandomId).then(
    fandomAndMedia => {
      fandomAndMedia.title = "Edit " + fandomAndMedia.fandom.mediaName;
      res.render('./admin/fandomEdit.hbs', fandomAndMedia);
    }
  )
});

module.exports = {
  fandomRouter
};