const route = require('express').Router();
const SoalController = require('../controllers/soal');

route.get('/', SoalController.getPaketList);
route.get('/:id', SoalController.getPaket);
route.get('/:colId/:soalId', SoalController.getSoal);
route.post('/:colId/:soalId', SoalController.jawabSoal);

module.exports = route;
