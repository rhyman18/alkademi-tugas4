const express = require('express');
const apiRoute = express.Router();
const userController = require('../controllers/user');
const roleController = require('../controllers/role');
const auth = require('../controllers/verifyJwtToken');

apiRoute.get('/', function(req, res) {
  res.send({
    judul: 'Panduan API',
    users: {
      judul: 'Daftar dan login user',
      endpointSignUp: '/auth/signup',
      deskripsiSignUp: 'Mendaftarkan user baru',
      endpointSignIn: '/auth/signin',
      deskripsiSignIn: 'Login user untuk mendapatkan accessToken',
    },
    roles: {
      judul: 'Menampilkan data roles',
      endpointRoles: '/roles',
      deskripsiRoles: 'Menampilkan semua data roles',
      endpointRoleUsers: '/roles/:role',
      deskripsiRoleUsers: 'Menampilkan daftar users berdasarkan role',
    },
  });
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

apiRoute.get('/roles', (req, res) => {
  try {
    auth.verifyToken(req, res, roleController.findAll);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.get('/roles/:role', (req, res) => {
  try {
    auth.verifyToken(req, res, roleController.findOne);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

module.exports = apiRoute;
