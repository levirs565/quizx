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
