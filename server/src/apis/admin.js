const route = require('express').Router();

route.use('/soal', require('./adminSoal').default);

module.exports = route;
