const express = require('express');
const cors = require('cors');
const databases = require('./src/database');
const utils = require('./src/utils');

const app = express();

app.use(cors());
app.use(express.json());

// Api untuk mengetes jika server telah siap
app.get('/api/test', (_, res) => {
  res.json({
    sukses: true,
    msg: 'Server telah siap',
  });
});

// Api untuk mendapatkan soal
app.get('/api/getSoal', (req, res) => {
  utils.handleBaseRequest(databases.getSoal(req.query.id), (val, isNull) => ({
    soal: isNull ? null : {
      _id: val._id,
      soal: val.soal,
      pilihan: val.pilihan,
    },
  }), 'Soal tidak ada', req, res);
});

app.post('/api/checkJawaban', (req, res) => {
  utils.handleBaseRequest(databases.getSoal(req.body.id), (val, isNull, treq) => ({
    benar: isNull ? false : treq.body.jawaban === val.jawaban,
  }), 'Soal tidak ada', req, res);
});

app.listen(3000, () => {
  console.log('SoalKU Back End serve ready on port 3000');
});
