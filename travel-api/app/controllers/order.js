const db = require('../models');
const Order = db.Order;

exports.findAll = async (req, res) => {
  const getAllOrder = await Order.findAll();

  console.log('>> Berhasil mendapatkan data order');

  res.send({
    request_status: true,
    message: 'Menampilkan list order yang tersedia.',
    data: getAllOrder,
  });
};

exports.findOne = async (req, res) => {
  const getOrder = await Order.findOne({
    where: {
      tix_id: req.params.tix_id,
    },
  });

  console.log('>> Berhasil mendapatkan data order');

  res.send({
    request_status: true,
    message: 'Menampilkan list order yang tersedia.',
    data: getOrder,
  });
};

exports.findMyOrder = async (req, res) => {
  const loginId = req.loginId;

  const getMyOrder = await Order.findAll({
    where: {
      UserId: loginId,
    },
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
