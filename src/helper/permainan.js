function isOnPermainan(req) {
  return req.session.onPermainan;
}
exports.isOnPermainan = isOnPermainan;

function setOnPermainan(req, state) {
  req.session.onPermainan = state;
}
exports.setOnPermainan = setOnPermainan;

function getSoalCollection(req) {
  return req.session.soals;
}
exports.getSoalCollection = getSoalCollection;

function setSoalCollection(req, soals) {
  req.session.soals = soals;
}
exports.setSoalCollection = setSoalCollection;

function setJawabanCollection(req, jawabans) {
  req.session.jawabans = jawabans;
}
exports.setJawabanCollection = setJawabanCollection;

function getJawabanCollection(req) {
  return req.session.jawabans;
}
exports.getJawabanCollection = getJawabanCollection;
