const app = require('../app');
const SoalController = require('../controllers/soal');

app.get('/api/soal/:id', SoalController.get);

app.post('/api/jawab/:id', SoalController.jawab);
