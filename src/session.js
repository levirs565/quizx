const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const savedSession = session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  secret: 'wedus nabrak witk kambil neng sor mahku',
  resave: true,
  saveUninitialized: false
});
exports.savedSession = savedSession;

function isOnPermainan(req) {
  return req.session.onPermainan;
}
exports.isOnPermainan = isOnPermainan;

function setOnPermainan(req, state) {
  req.session.onPermainan = state;
}
exports.setOnPermainan = setOnPermainan;

function getSoalPermainan(req) {
  return req.session.soals;
}
exports.getSoalPermainan = getSoalPermainan;

function setSoalPermainan(req, soals) {
  req.session.soals = soals;
}
exports.setSoalPermainan = setSoalPermainan;
