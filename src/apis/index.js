const route = require('express').Router();

route.get('/test', (req, res) => {
  res.json({
    err: null,
    msg: 'Server sedang berjalan'
  });
});

route.use('/soal', require('./soal'));
route.use('/user', require('./user'));

module.exports = route;
