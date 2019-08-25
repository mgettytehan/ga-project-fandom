const express = require('express');

const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    res.render('./index.hbs');
});

mainRouter.get('/admin', (req, res) => {
    res.render('./admin/main.hbs');
});

module.exports = {
    mainRouter
}