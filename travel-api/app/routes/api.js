const express = require('express');
const apiRoute = express.Router();
const carController = require('../controllers/car');
const userController = require('../controllers/user');
const roleController = require('../controllers/role');
const orderController = require('../controllers/order');
const terminalController = require('../controllers/terminal');
const destinationController = require('../controllers/destination');
const auth = require('../controllers/verifyJwtToken');

apiRoute.get('/', function (req, res) {
  res.send({
    judul: 'Panduan API',
    users: {
      judul: 'Mengelola users, daftar dan login',
      endpointSignUp: '[POST]: /auth/signup',
      requestBodySignUp: {
        name: 'STRING',
        email: 'STRING UNIQUE',
        password: 'STRING',
        address: 'STRING',
        role: 'ENUM (USER, STAFF, PM, ADMIN)',
      },
      deskripsiSignUp: 'Mendaftarkan user baru',
      endpointSignIn: '[POST]: /auth/signin',
      requestBodySignIn: {
        email: 'STRING UNIQUE',
        password: 'STRING',
      },
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
      judul: 'Mengelola bagian order/booking',
      endpointOrder: '[GET]: /order',
      deskripsiorder: 'Menampilkan order anda (login user)',
      endpointOrderAdd: '[POST]: /order',
      requestBodyOrderAdd: {
        from_location: 'STRING (sementara tersedia: JAKARTA, BANDUNG, YOGYAKARTA)',
        to_location: 'STRING',
        payment_method: 'STRING',
        go_date: 'DATE',
        car: 'INTEGER (sementara tersedia: 1, 2, 3, 4, 5)',
      },
      deskripsiorderAdd: 'Menampilkan order anda (login user)',
      endpointOrderAdmin: '[GET]: /order/admin',
      deskripsiOrderAdmin: 'Menampilkan semua data order [Role PM keatas]',
      endpointOrderFind: '[GET]: /order/find/:tix_id',
      deskripsiOrderFind: 'Mencara order berdasarkan tix_id',
    },
    destination: {
      judul: 'Mengelola bagian destinasi/rute travel',
      endpointDestination: '[GET]: /destination',
      deskripsiDestination: 'Menampilkan semua destinasi',
      endpointDestinationAdd: '[POST]: /destination',
      requestBodyDestinationAdd: {
        from_location: 'STRING (sementara tersedia: JAKARTA, BANDUNG, YOGYAKARTA)',
        to_location: 'STRING',
        price: 'INTEGER',
        mileage: 'INTEGER',
      },
      deskripsiDestinationAdd: 'Menambahkan destinasi kota yang belum terdaftar [Role PM Keatas]',
    },
    city: {
      judul: 'Mengelola bagian kota',
      endpointCity: '[GET]: /city',
      deskripsiCity: 'Menampilkan list kota yang terdaftar',
      endpointCityAdd: '[POST]: /city',
      requestBodyCityAdd: {
        name: 'STRING',
      },
      deskripsiCityAdd: 'Menambah kota baru untuk jadi rute destinasi [Role PM Keatas]',
    },
    car: {
      judul: 'Mengelola bagian kendaraan',
      endpointCity: '[GET]: /car',
      deskripsiCity: 'Menampilkan list kendaraan yang terdaftar',
      endpointCityAdd: '[POST]: /car',
      requestBodyCityAdd: {
        name: 'STRING',
        license: 'STRING UNIQUE',
      },
      deskripsiCityAdd: 'Menambah unit kendaraan baru [Role PM Keatas]',
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

apiRoute.get('/city', (req, res) => {
  try {
    auth.verifyToken(req, res, terminalController.findAll);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.post('/city', (req, res) => {
  try {
    auth.verifyToken(req, res, terminalController.create, 3);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.get('/car', (req, res) => {
  try {
    auth.verifyToken(req, res, carController.findAll);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

apiRoute.post('/car', (req, res) => {
  try {
    auth.verifyToken(req, res, carController.create, 3);
  } catch (err) {
    console.log('>> Error: ' + err);
    res.status(400).send({
      request_status: false,
      message: err.message,
    });
  }
});

module.exports = apiRoute;
