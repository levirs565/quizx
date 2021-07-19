const express = require('express');
const cors = require('cors');
const sessionMiddleware = require('./middleware/session').default;
const errorMiddleware = require('./middleware/error').default

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.SERVER_CORS_ORIGIN
  })
);
app.use(express.json());
app.use(sessionMiddleware);

app.use('/api', require('./routes').default);

app.use(errorMiddleware)

exports = app;
module.exports = app;
