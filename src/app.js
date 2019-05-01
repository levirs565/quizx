const express = require('express');
const session = require('./helper/session');

const app = express();

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
