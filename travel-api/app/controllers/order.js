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
