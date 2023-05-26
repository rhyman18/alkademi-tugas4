const express = require('express');
const apiRoute = express.Router();
const userController = require('../controllers/user');

apiRoute.get('/', function(req, res) {
  res.send('Router home page');
});

apiRoute.post('/auth/signup', (req, res) => {
  try {
    userController.signUp(req, res);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.post('/auth/signin', (req, res) => {
  try {
    userController.signIn(req, res);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

module.exports = apiRoute;
