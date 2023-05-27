const db = require('../models');
const Terminal = db.Terminal;

exports.findAll = async (req, res) => {
  const getTerminal = await Terminal.findAll();

  console.log('>> Berhasil mendapatkan data kota');

  res.send({
    request_status: true,
    message: 'Menampilkan list kota yang tersedia.',
    data: getTerminal,
  });
};

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      request_status: false,
      message: 'Isi nama kota terlebih dahulu',
    });
    return;
  }


  const createTerminal = await Terminal.create({
    name: req.body.name,
  });
  console.log('>> Berhasil mendaftarkan kota');

  res.send({
    request_status: true,
    message: 'Berhasil menambahkan kota baru, silahkan daftarkan di destinasi rute.',
    data: createTerminal,
  });
};
