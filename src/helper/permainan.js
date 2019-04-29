const database = require('./database');

function isOnPermainan(req) {
  return req.session.onPermainan;
}
exports.isOnPermainan = isOnPermainan;

function setOnPermainan(req, state) {
  req.session.onPermainan = state;
}

function getSoalPermainan(req) {
  return req.session.soals;
}
exports.getSoalPermainan = getSoalPermainan;

function setSoalPermainan(req, soals) {
  req.session.soals = soals;
}

function startPermainan(req) {
  return new Promise(resolve => {
    setOnPermainan(req, true);
    database.createRandomSoalCollections(40).then(val => {
      setSoalPermainan(req, val);
      resolve(true);
    });
  });
}
exports.startPermainan = startPermainan;

function stopPermainan(req) {
  return new Promise(resolve => {
    setOnPermainan(req, false);
    resolve(true);
  });
}
exports.stopPermainan = stopPermainan;
