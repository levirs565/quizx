const express = require('express');
const cors = require('cors');
const session = require('./configs/session');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.DB_URI
  })
);
app.use(express.json());
app.use(session.savedSession);

app.get('/api/test', (req, res) => {
  res.json({
    err: null,
    msg: 'Server sedang berjalan'
  });
});

exports = app;
module.exports = app;
