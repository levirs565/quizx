const route = require('express').Router();

route.get('/test', (req, res) => {
  res.json({
    err: null,
    msg: 'Server sedang berjalan'
  });
});

route.use('/quiz', require('./quiz').default);
route.use('/user', require('./user'));
route.use('/permainan', require('./game').default);

module.exports = route;
