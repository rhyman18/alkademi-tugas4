const db = require('../models');
const Terminal = db.Terminal;

exports.findAll = async (req, res) => {
  const getTerminal = await Terminal.findAll({});

  res.send(getTerminal);
};
