const db = require('../models');
const Car = db.Car;

exports.findAll = async (req, res) => {
  const getCar = await Car.findAll();

  console.log('>> Berhasil mendapatkan data mobil');

  res.send({
    request_status: true,
    message: 'Menampilkan list mobil yang tersedia.',
    data: getCar,
  });
};

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      request_status: false,
      message: 'Isi nama kendaraan terlebih dahulu',
    });
    return;
  }
  if (!req.body.license) {
    res.status(400).send({
      request_status: false,
      message: 'Isi plat nomor kendaraan terlebih dahulu',
    });
    return;
  }

  const createCar = await Car.create({
    name: req.body.name,
    license: req.body.license,
  });

  console.log('>> Berhasil mendaftarkan kendaraan');

  res.send({
    request_status: true,
    message: 'Berhasil menambahkan unit kendaraan baru.',
    data: createCar,
  });
};

