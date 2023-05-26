require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const Role = db.Role;

exports.signUp = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      request_status: false,
      message: 'Isi nama terlebih dahulu',
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({
      request_status: false,
      message: 'Isi email terlebih dahulu',
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      request_status: false,
      message: 'Isi password terlebih dahulu',
    });
    return;
  }
  if (!req.body.address) {
    res.status(400).send({
      request_status: false,
      message: 'Isi alamat terlebih dahulu',
    });
    return;
  }
  if (!req.body.role) {
    res.status(400).send({
      request_status: false,
      message: 'Isi role terlebih dahulu',
    });
    return;
  }

  const getRoles = await Role.findOne({
    where: {
      name: req.body.role,
    },
  });

  if (!getRoles) {
    res.status(400).send({
      request_status: false,
      message: 'Role tidak terdaftar',
    });
    return;
  }

  const inputUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    address: req.body.address,
    RoleId: getRoles.id,
  };

  const createUser = await User.create(inputUser);

  console.log('>> Berhasil mendaftarkan user');
  res.send({
    request_status: true,
    message: 'User berhasil dibuat, silahkan lanjutkan sign in.',
    data: {
      id: createUser.id,
      name: inputUser.name,
      role: req.body.role,
      email: inputUser.email,
      password: req.body.password,
      address: inputUser.address,
    },
  });
};

exports.signIn = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      request_status: false,
      message: 'Isi email terlebih dahulu',
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      request_status: false,
      message: 'Isi password terlebih dahulu',
    });
    return;
  }

  const getUser = await User.findOne({
    where: {
      email: req.body.email,
    },
    include: [{model: Role}],
  });

  if (!getUser) {
    res.status(400).send({
      request_status: false,
      message: 'Email tidak terdaftar',
    });
    return;
  }

  const verifyPassword = bcrypt.compareSync(req.body.password, getUser.password);

  if (!verifyPassword) {
    res.status(400).send({
      request_status: false,
      message: 'Password tidak cocok',
    });
    return;
  }

  const token = jwt.sign({
    id: getUser.id,
  }, process.env.SECRET, {
    expiresIn: 86400,
  });

  console.log('>> Berhasil login');
  res.send({
    request_status: verifyPassword,
    message: 'User berhasil login. Gunakan Akses token untuk mengakses API.',
    data: {
      name: getUser.name,
      email: getUser.email,
      role: getUser.Role.name,
    },
    accessToken: token,
  });
};
