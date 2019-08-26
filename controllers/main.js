const express = require('express');

const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    res.render('./index.hbs', {title: 'Main'});
});

mainRouter.get('/admin', (req, res) => {
    res.render('./admin/main.hbs', { title: 'Admin'});
});

module.exports = {
    mainRouter
}