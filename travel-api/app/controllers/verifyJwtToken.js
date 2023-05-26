require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

exports.verifyToken = async (req, res, next, role = 1) => {
  const tokenHeader = req.headers.authorization || false;

  if (!tokenHeader) {
    res.status(500).send({
      request_status: false,
      message: 'Unauthorized.',
    });
    return;
  } else if (tokenHeader.split(' ')[0] !== 'Bearer') {
    res.status(500).send({
      request_status: false,
      message: 'Incorrect token format, use Bearer as a prefix.',
    });
    return;
  }

  const token = tokenHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      res.status(500).send({
        request_status: false,
        message: err.message,
      });
      return;
    }

    console.log('>> Token terautentikasi.');
    req.loginId = decoded.id;

    const getUser = await User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (getUser.RoleId >= role) {
      console.log('>> Role terpenuhi.');
      next(req, res);
    } else {
      console.log('>> Role tidak terpenuhi.');
      res.status(500).send({
        request_status: false,
        message: 'Role anda tidak cukup untuk melakukan aksi.',
      });
      return;
    }
  });
};
