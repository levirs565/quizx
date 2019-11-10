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

app.use('/api', require('./apis'));

exports = app;
module.exports = app;
