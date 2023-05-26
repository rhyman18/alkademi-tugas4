require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./app/models');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(express.static('app/public'));

async function synchronizeDb() {
  try {
    await db.sequelize.sync();
    console.log('>> Database synced successfully');
  } catch (err) {
    console.log('>> Failed to sync database : ' + err);
  }
}

synchronizeDb();

const title = process.env.TITLE;
const port = process.env.PORT;
const baseUrl = `${process.env.HOST}:${process.env.port}`;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(function timelog(req, res, next) {
  console.log('>> Request URI path : ' + req.url);
  next();
});

app.get('/', (req, res) => {
  res.send({
    message: 'Selamat datang di Travel API. hit /api endpoint untuk menggunakan',
  });
});

const apiRoute = require('./app/routes/api');

app.use('/api/', apiRoute);

app.listen(port, () => {
  console.log(`>> ${title} - Server listening on ${baseUrl}`);
});
