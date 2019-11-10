const route = require('express').Router();
const SoalController = require('../controllers/soal');

route.get('/', SoalController.getCollectionList);
route.get('/:id', SoalController.getCollection);
route.get('/:colId/:soalId', SoalController.getSoal);
route.post('/:colId/:soalId', SoalController.jawabSoal);

module.exports = route;
