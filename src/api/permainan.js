const app = require('../app');
const utils = require('../helper/utils');
const consts = require('../consts');
const helper = require('../helper/permainan');
const soal = require('../helper/soal');

app.post('/api/permainan/start', (req, res) => {
  utils.handleRequest(
    new Promise((resolve, reject) => {
      if (helper.isOnPermainan(req)) {
        reject(consts.MSG_ON_PERMAINAN);
      }

      helper.setOnPermainan(req, true);
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
      if (!helper.isOnPermainan(req)) {
        reject(consts.MSG_N_ON_PERMAINAN);
      }

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

app.post('/api/permainan/stop', (req, res) => {
  utils.handleRequest(
    new Promise((resolve, reject) => {
      if (!helper.isOnPermainan(req)) {
        reject(consts.MSG_N_ON_PERMAINAN);
      }

      helper.setOnPermainan(req, undefined);
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
