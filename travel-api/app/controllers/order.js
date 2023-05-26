const db = require('../models');
const Car = db.Car;
const User = db.User;
const Order = db.Order;
const Terminal = db.Terminal;
const Destination = db.Destination;

exports.findAll = async (req, res) => {
  const getAllOrder = await Order.findAll({
    include: [
      {model: User},
      {model: Car},
      {model: Destination},
    ],
  });

  console.log('>> Berhasil mendapatkan data order');

  res.send({
    request_status: true,
    message: 'Menampilkan list order yang tersedia.',
    data: getAllOrder || 'Tidak ada order tersedia',
  });
};

exports.findOne = async (req, res) => {
  const getOrder = await Order.findOne({
    where: {
      tix_id: req.params.tix_id,
    },
    include: [
      {model: User},
      {model: Car},
      {model: Destination},
    ],
  });

  console.log('>> Berhasil mendapatkan data order');

  res.send({
    request_status: true,
    message: 'Menampilkan list order yang tersedia.',
    data: getOrder || 'Tidak menemukan order.',
  });
};

exports.findMyOrder = async (req, res) => {
  const loginId = req.loginId;

  const getMyOrder = await Order.findAll({
    where: {
      UserId: loginId,
    },
    include: [
      {model: User},
      {model: Car},
      {model: Destination},
    ],
  });

  if (getMyOrder.length === 0) {
    res.status(400).send({
      request_status: true,
      message: 'Anda belum order, ayo segera order.',
    });
    return;
  }

  console.log('>> Berhasil mendapatkan data order');

  res.send({
    request_status: true,
    message: 'Menampilkan list order yang tersedia.',
    data: getMyOrder,
  });
};

exports.createOrder = async (req, res) => {
  const loginId = req.loginId;

  const tixId = `${new Date().getFullYear()}-00${Date.now()}-${loginId}`;

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
  if (!req.body.payment_method) {
    res.status(400).send({
      request_status: false,
      message: 'Isi metode pembayaran terlebih dahulu',
    });
    return;
  }
  if (!req.body.go_date) {
    res.status(400).send({
      request_status: false,
      message: 'Isi tanggal keberangkatan terlebih dahulu',
    });
    return;
  }
  if (!req.body.car) {
    res.status(400).send({
      request_status: false,
      message: 'Pilih mobil terlebih dahulu',
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

  const getCar = await Car.findOne({
    where: {
      id: req.body.car,
    },
  });

  if (!getCar) {
    res.status(400).send({
      request_status: false,
      message: 'Mobil tidak ditemukan',
    });
    return;
  }

  const getDestination = await Destination.findOne({
    where: {
      from_terminal_id: getFromLocation.id,
      to_terminal_id: getToLocation.id,
    },
  });

  const adminCost = 7500;

  const inputOrder = {
    tix_id: tixId,
    order_date: new Date(),
    go_date: req.body.go_date,
    fee: adminCost,
    total_cost: getDestination.price + adminCost,
    payment_method: req.body.payment_method,
    status: false,
    UserId: loginId,
    CarId: getCar.id,
    DestinationId: getDestination.id,
  };

  await Order.create(inputOrder);

  console.log('>> Berhasil membuat order');

  res.send({
    request_status: true,
    message: 'Berhasil booking, silahkan lakukan pembayaran terlebih dahulu.',
    data: {
      tix_id: inputOrder.tix_id,
      order_date: inputOrder.order_date,
      go_date: inputOrder.go_date,
      status: 'Belum Bayar',
      car: `${getCar.name} (${getCar.license})`,
      destination: `${req.body.from_location} - ${req.body.to_location}`,
      payment_method: inputOrder.payment_method,
      total_cost: inputOrder.total_cost,
    },
  });
};
