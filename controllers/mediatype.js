const express = require('express');

const { mediaTypeApi } = require('../models/db-mediatype.js');

const mediaTypeRouter = express.Router();

mediaTypeRouter.route('/')
  .get( (req, res) => {
    mediaTypeApi.getAll().then(
      mediaTypes => res.render('./admin/mediaTypes', { title: 'Edit Media Types', mediaTypes })
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .post( (req, res) => {
    mediaTypeApi.addDocs(req.body).then(
      () => res.redirect('/mediatypes')
    ).catch(
      () => res.sendStatus(400)
    );
  });

mediaTypeRouter.route('/:mediaTypeId')
  .put( (req, res) => {
    mediaTypeApi.updateDoc(req.params.mediaTypeId, req.body).then(
      () => res.redirect('/mediatypes')
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .delete( (req, res) => {
    mediaTypeApi.deleteDoc(req.params.mediaTypeId).then(
      () => res.redirect('/mediatypes')
    ).catch(
      () => res.sendStatus(400)
    )
  });

module.exports = {
  mediaTypeRouter
};