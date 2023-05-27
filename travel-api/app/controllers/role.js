const db = require('../models');
const Role = db.Role;

exports.findAll = async (req, res) => {
  const getRole = await Role.findAll();

  console.log('>> Berhasil mendapatkan data role');

  res.send({
    request_status: true,
    message: 'Menampilkan list role yang tersedia.',
    data: getRole,
  });
};

exports.findOne = async (req, res) => {
  const getRole = await Role.findAll({
    where: {
      name: req.params.role,
    },
    include: [{model: db.User}],
  });

  console.log('>> Berhasil mendapatkan data role');

  res.send({
    request_status: true,
    message: 'Menampilkan list users berdasarkan role nya.',
    data: getRole,
  });
};
