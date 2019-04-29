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
