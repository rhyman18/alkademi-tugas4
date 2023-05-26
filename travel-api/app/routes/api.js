const express = require('express');
const apiRoute = express.Router();
const userController = require('../controllers/user');
const roleController = require('../controllers/role');
const orderController = require('../controllers/order');
const destinationController = require('../controllers/destination');
const auth = require('../controllers/verifyJwtToken');

apiRoute.get('/', function(req, res) {
  res.send({
    judul: 'Panduan API',
    users: {
      judul: 'Daftar dan login user',
      endpointSignUp: '[POST]: /auth/signup',
      requestBodySignUp: 'name, email, password, address, role = (USER, STAFF, PM, ADMIN)',
      deskripsiSignUp: 'Mendaftarkan user baru',
      endpointSignIn: '[POST]: /auth/signin',
      requestBodySignIn: 'email, password',
      deskripsiSignIn: 'Login user untuk mendapatkan accessToken',
    },
    roles: {
      judul: 'Menampilkan data roles [Role PM keatas]',
      endpointRoles: '[GET]: /roles',
      deskripsiRoles: 'Menampilkan semua data roles',
      endpointRoleUsers: '[GET]: /roles/:role',
      deskripsiRoleUsers: 'Menampilkan daftar users berdasarkan role',
    },
    order: {
      judul: 'Menampilkan data order',
      endpointOrder: '[GET]: /order',
      deskripsiorder: 'Menampilkan order anda (login user)',
      endpointOrderAdd: '[POST]: /order',
      requestBodyOrderAdd: 'from_location - to_location (JAKARTA, BANDUNG, YOGYAKARTA), payment_method, go_date (yyyy-mm-dd hh:mm:ss), car (pilih 1-5)',
      deskripsiorderAdd: 'Menampilkan order anda (login user)',
      endpointOrderAdmin: '[GET]: /order/admin',
      deskripsiOrderAdmin: 'Menampilkan semua data order [Role PM keatas]',
      endpointOrderFind: '[GET]: /order/find/:tix_id',
      deskripsiOrderFind: 'Mencara order berdasarkan tix_id',
    },
    destination: {
      judul: 'Menampilkan destinasi/rute travel kami',
      endpointDestination: '[GET]: /destination',
      deskripsiDestination: 'Menampilkan semua destinasi',
      endpointDestinationAdd: '[POST]: /destination',
      requestBodyDestinationAdd: 'from_location - to_location (PASTIKAN MENAMBAH KOTA BARU DULU), price, mileage',
      deskripsiDestinationAdd: 'Menambahkan destinasi kota yang belum terdaftar [Role PM Keatas]',
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
    auth.verifyToken(req, res, roleController.findAll, 3);
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
    auth.verifyToken(req, res, roleController.findOne, 3);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.get('/order', (req, res) => {
  try {
    auth.verifyToken(req, res, orderController.findMyOrder);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.post('/order', (req, res) => {
  try {
    auth.verifyToken(req, res, orderController.createOrder);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.get('/order/admin', (req, res) => {
  try {
    auth.verifyToken(req, res, orderController.findAll, 3);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.get('/order/find/:tix_id', (req, res) => {
  try {
    auth.verifyToken(req, res, orderController.findOne);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.get('/destination', (req, res) => {
  try {
    auth.verifyToken(req, res, destinationController.findAll);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.post('/destination', (req, res) => {
  try {
    auth.verifyToken(req, res, destinationController.create, 3);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

module.exports = apiRoute;
