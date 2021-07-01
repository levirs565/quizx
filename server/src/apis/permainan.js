const route = require('express').Router();
const PermainanController = require('../controllers/permainan');

route.post('/start', PermainanController.startPermainan);
route.get('/soal/:id', PermainanController.getSoal);
route.put('/soal/:id', PermainanController.putJawaban);
route.post('/stop', PermainanController.stopPermainan);
route.get('/state', PermainanController.state);

module.exports = route;
