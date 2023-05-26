require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

exports.verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization || false;

  if (!tokenHeader) {
    res.status(500).send({
      request_status: true,
      message: 'Unauthorized.',
    });
    return;
  }

  const token = tokenHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.status(500).send({
        request_status: true,
        message: err.message + ' or wrong token',
      });
      return;
    }

    next(req, res);
  });
};
