const db = require('../models');
const Destination = db.Destination;
const Terminal = db.Terminal;

exports.findAll = async (req, res) => {
  const [results, metadata] = await db.sequelize
      .query('SELECT t1.name AS from_location, t2.name AS to_location, Destinations.price, Destinations.mileage FROM Destinations LEFT JOIN Terminals t1 ON Destinations.from_terminal_id = t1.id LEFT JOIN Terminals t2 ON Destinations.to_terminal_id = t2.id');

  console.log('>> Berhasil mendapatkan data order');

  res.send({
    request_status: true,
    message: 'Menampilkan destinasi yang tersedia.',
    data: results,
  });
};

exports.create = async (req, res) => {
  if (!req.body.from_location) {
    res.status(400).send({
      request_status: false,
      message: 'Isi asal kota terlebih dahulu',
    });
    return;
  }
  if (!req.body.to_location) {
    res.status(400).send({
      request_status: false,
      message: 'Isi kota tujuan terlebih dahulu',
    });
    return;
  }
  if (!req.body.price) {
    res.status(400).send({
      request_status: false,
      message: 'Isi tarif terlebih dahulu',
    });
    return;
  }
  if (!req.body.mileage) {
    res.status(400).send({
      request_status: false,
      message: 'Isi estimasi jarak terlebih dahulu',
    });
    return;
  }

  const getFromLocation = await Terminal.findOne({
    where: {
      name: req.body.from_location,
    },
  });

  const getToLocation = await Terminal.findOne({
    where: {
      name: req.body.to_location,
    },
  });

  if (!getFromLocation || !getToLocation) {
    res.status(400).send({
      request_status: false,
      message: 'Kota tidak ditemukan',
    });
    return;
  }

  const getDestination = await Destination.findOne({
    where: {
      from_terminal_id: getFromLocation.id,
      to_terminal_id: getToLocation.id,
    },
  });

  if (getDestination) {
    res.status(400).send({
      request_status: false,
      message: 'Destinasi sudah terdaftar',
      data: getDestination,
    });
    return;
  } else {
    const inputDestination = {
      price: req.body.price,
      mileage: req.body.mileage,
      from_terminal_id: getFromLocation.id,
      to_terminal_id: getToLocation.id,
    };

    const create = await Destination.create(inputDestination);

    console.log('>> Berhasil mendaftarkan destinasi.');

    res.send({
      request_status: true,
      message: 'Destinasi berhasil didaftarkan.',
      data: {
        id: create.id,
        price: create.price,
        mileage: create.mileage + ' Km',
        from_location: req.body.from_location,
        to_location: req.body.to_location,
      },
    });
  }
};
