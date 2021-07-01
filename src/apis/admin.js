const route = require('express').Router();

route.use('/soal', require('./adminSoal'));

module.exports = route;
