const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({
    err: null,
    msg: 'Server sedang berjalan'
  });
});

exports = app;
module.exports = app;
