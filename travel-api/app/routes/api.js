const express = require('express');
const apiRoute = express.Router();

apiRoute.get('/', function(req, res) {
    res.send('Router home page');
});

module.exports = apiRoute;
