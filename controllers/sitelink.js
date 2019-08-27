const express = require('express');

const { siteLinkApi } = require('../models/db-sitelink.js');

const siteLinkRouter = express.Router();

siteLinkRouter.route('/')
  .get( (req, res) => {
    siteLinkApi.getAll().then(
      siteLinks => res.render('./admin/siteLinks.hbs', { title: 'Edit Sites', siteLinks })
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .post( (req, res) => {
    siteLinkApi.addDocs(req.body).then(
      () => res.redirect('/sitelinks')
    ).catch(
      () => res.sendStatus(400)
    );
  });

  siteLinkRouter.route('/:siteLinkId')
  .put( (req, res) => {
    siteLinkApi.updateDoc(req.params.siteLinkId, req.body).then(
      () => res.redirect('/sitelinks')
    ).catch(
      () => res.sendStatus(400)
    );
  })
  .delete( (req, res) => {
    siteLinkApi.deleteDoc(req.params.siteLinkId).then(
      () => res.redirect('/sitelinks')
    ).catch(
      () => res.sendStatus(400)
    )
  });

module.exports = {
  siteLinkRouter
};