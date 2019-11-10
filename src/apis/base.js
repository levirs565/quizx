const app = require('../app');
const soal = require('../helper/soal');
const utils = require('../helper/utils');
const consts = require('../consts');

app.get('/api/soal/:id', (req, res) => {
  utils.handleRequest(
    soal.getSoal(req.params.id),
    (val, isNull) => ({
      soal: isNull
        ? null
        : {
            id: val._id,
            soal: val.soal,
            pilihan: val.pilihan
          }
    }),
    consts.MSG_SOAL_NF,
    req,
    res
  );
});

app.post('/api/jawab/:id', (req, res) => {
  utils.handleRequest(
    soal.getSoal(req.params.id),
    (val, isNull) => ({
      benar: isNull ? false : val.jawaban === req.body.jawaban
    }),
    consts.MSG_SOAL_NF,
    req,
    res
  );
});
