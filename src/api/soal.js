const app = require('../app');
const SoalController = require('../controllers/soal');

app.get('/api/soal/', SoalController.getCollectionList);
app.get('/api/soal/:id', SoalController.getCollection);
app.get('/api/soal/:colId/:soalId', SoalController.getSoal);
app.post('/api/soal/:colId/:soalId', SoalController.jawabSoal);
