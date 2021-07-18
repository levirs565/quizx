const route = require('express').Router();

route.get('/test', (req, res) => {
  res.json({
    err: null,
    msg: 'Server sedang berjalan'
  });
});

route.use('/soal', require('./quiz').default);
route.use('/user', require('./user'));
route.use('/permainan', require('./permainan'));

module.exports = route;
