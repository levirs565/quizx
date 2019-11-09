const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

const loginAs = (id, session) => {
  const ses = session;
  ses.user = id;
};

const loggedAs = session => session.user;

exports.signup = (id, name, password) =>
  User.findOne({ id })
    .then(user => {
      if (user) {
        throw Error('Account already registered');
      }

      return bcrypt.genSalt(saltRounds);
    })
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      const user = new User({
        id,
        name,
        password: hash
      });

      return user.save();
    });

exports.login = (id, password, session) => {
  if (loggedAs(session)) {
    return Promise.reject(Error('Please logout first'));
  }

  return User.findOne({ id })
    .then(user => {
      if (!user) {
        throw Error('Account not registered');
      }

      const userPromise = Promise.resolve(user);
      const comparePromise = bcrypt.compare(password, user.password);

      return Promise.all([userPromise, comparePromise]);
    })
    .then(([user, matched]) => {
      if (!matched) throw Error('Password not match');

      loginAs(user.id, session);
    });
};

exports.logout = session =>
  new Promise((resolve, reject) => {
    if (!loggedAs(session)) {
      reject(Error('Please login first'));
      return;
    }

    loginAs(undefined, session);
    resolve(undefined);
  });

exports.status = session =>
  new Promise(resolve => {
    const user = loggedAs(session);

    resolve({
      loggedIn: user != null,
      user
    });
  });
