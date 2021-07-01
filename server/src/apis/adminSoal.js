const route = require('express').Router();
const SoalAdminController = require('../controllers/adminSoal');

route.get('/', SoalAdminController.getPaketList);
route.post('/', SoalAdminController.newPaket);
route.get('/:id', SoalAdminController.getPaket);
route.put('/:id', SoalAdminController.editPaket);
route.delete('/:id', SoalAdminController.removePaket);
route.post('/:paketID', SoalAdminController.newSoal);
route.get('/:paketID/:soalID', SoalAdminController.getSoal);
route.put('/:paketID/:soalID', SoalAdminController.editSoal);
route.delete('/:paketID/:soalID', SoalAdminController.removeSoal);

module.exports = route;
