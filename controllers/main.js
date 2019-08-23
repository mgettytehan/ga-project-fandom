const express = require('express');

const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    res.render('./index.hbs');
});

module.exports = {
    mainRouter
}