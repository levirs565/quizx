const app = require('../app');
const utils = require('../helper/utils');
const consts = require('../consts');
const helper = require('../helper/permainan');
const soal = require('../helper/soal');

function checkInPermainan(req, reject) {
  if (!helper.isOnPermainan(req)) {
    reject(consts.MSG_N_ON_PERMAINAN);
  }
}

app.post('/api/permainan/start', (req, res) => {
  utils.handleRequest(
    new Promise((resolve, reject) => {
      if (helper.isOnPermainan(req)) {
        reject(consts.MSG_ON_PERMAINAN);
      }

      helper.setOnPermainan(req, true);
      helper.setPermainanFinished(req, false);
      helper.setJawabanCollection(req, []);
      soal.createRandomSoalCollection(40).then(val => {
        helper.setSoalCollection(req, val);
        resolve(true);
      });
    }),
    () => ({}),
    consts.MSG_KESALAHAN_ANEH,
    req,
    res
  );
});

app.get('/api/permainan/soal/:id', (req, res) => {
  utils.handleRequest(
    new Promise((resolve, reject) => {
      checkInPermainan(req, reject);

      resolve(helper.getSoalCollection(req)[req.params.id]);
    }),
    (val, isNull) => ({
      soal: isNull
        ? null
        : {
            id: req.params.id,
            soal: val.soal,
            pilihan: val.pilihan
          }
    }),
    consts.MSG_SOAL_NF,
    req,
    res
  );
});

app.post('/api/permainan/jawab/:id', (req, res) => {
  utils.handleRequest(
    new Promise((resolve, reject) => {
      checkInPermainan(req, reject);

      helper.getJawabanCollection(req)[req.params.id] = req.body.jawaban;

      resolve(true);
    }),
    () => ({}),
    consts.MSG_SOAL_NF,
    req,
    res
  );
});

app.post('/api/permainan/stop', (req, res) => {
  utils.handleRequest(
    new Promise((resolve, reject) => {
      checkInPermainan(req, reject);

      helper.setOnPermainan(req, undefined);
      helper.setResults(
        req,
        soal.calculateResults(helper.getSoalCollection(req), helper.getJawabanCollection(req))
      );
      helper.setPermainanFinished(req, true);
      helper.setJawabanCollection(req, undefined);
      helper.setSoalCollection(req, undefined);
      resolve(true);
    }),
    () => ({}),
    consts.MSG_KESALAHAN_ANEH,
    req,
    res
  );
});

app.get('/api/permainan/results', (req, res) => {
  utils.handleRequest(
    new Promise(resolve => {
      if (!helper.isPermainanFinished(req)) {
        resolve(null);
      }

      resolve(helper.getResults(req));
    }),
    (val, isNull) => ({
      results: isNull
        ? null
        : {
            takDiJawab: val.takDiJawab.length,
            benar: val.benar.length,
            salah: val.salah.length
          }
    }),
    consts.MSG_N_FINISHED,
    req,
    res
  );
});
