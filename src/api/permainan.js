const app = require('../app');
const utils = require('../helper/utils');
const consts = require('../consts');
const helper = require('../helper/permainan');
const soal = require('../helper/soal');

function preq(req) {
  let p = req.session.permainan;
  if (p) {
    Object.setPrototypeOf(p, helper.Permainan.prototype);
  }

  return p;
}

function checkInPermainan(req, reject) {
  let p = preq(req);
  if (p == null || p.isFinished) {
    reject(consts.MSG_N_ON_PERMAINAN);
  }
}

app.post('/api/permainan/start', (req, res) => {
  utils.handleRequest(
    (resolve, reject) => {
      const p = preq(req);
      if (p != null && !p.isFinished) {
        reject(consts.MSG_ON_PERMAINAN);
      }

      soal.createRandomSoalCollection(40).then(val => {
        req.session.permainan = new helper.Permainan(val);
        resolve(true);
      });
    },
    () => ({}),
    consts.MSG_KESALAHAN_ANEH,
    req,
    res
  );
});

app.get('/api/permainan/soal/:id', (req, res) => {
  utils.handleRequest(
    (resolve, reject) => {
      checkInPermainan(req, reject);
      resolve(preq(req).getSoal(req.params.id));
    },
    (val, isNull) => ({
      soal: isNull
        ? null
        : {
          id: Number(req.params.id),
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
    (resolve, reject) => {
      checkInPermainan(req, reject);
      preq(req).setJawaban(req.params.id, req.body.jawaban);
      resolve(true);
    },
    () => ({}),
    consts.MSG_SOAL_NF,
    req,
    res
  );
});

app.post('/api/permainan/stop', (req, res) => {
  utils.handleRequest(
    (resolve, reject) => {
      checkInPermainan(req, reject);
      preq(req).finish();
      resolve(true);
    },
    () => ({}),
    consts.MSG_KESALAHAN_ANEH,
    req,
    res
  );
});

app.get('/api/permainan/results', (req, res) => {
  utils.handleRequest(
    resolve => {
      const p = preq(req);
      if (p == null || !p.isFinished) {
        resolve(null);
      }

      resolve(p.results);
    },
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

app.get('/api/permainan/state', (req, res) => {
  utils.handleRequest(
    resolve => {
      const p = preq(req);

      const result = {
        onPermainan: p != null
      };

      if (result.onPermainan) {
        result.permainanFinished = p.isFinished;
        result.lastSoal = p.lastSoal;

        if (p.isFinished) {
          result.onPermainan = false;
        }
      }

      resolve(result);
    },
    (val, isNull) => ({
      state: isNull ? null : val
    }),
    consts.MSG_KESALAHAN_ANEH,
    req,
    res
  );
});
