const bcrypt = require('bcrypt');
const User = require('../models/user');
const { EError, E } = require('../error');

const saltRounds = 10;

const loginAs = (id, session) => {
  const ses = session;
  ses.user = id;
};

const loggedAs = session => session.user;

exports.signup = (id, name, password) =>
  User.findOne({ id })
    .then(user => {
      if (user) throw new EError(...E.E301_USER_ALREADY_REGISTERED);

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
    return Promise.reject(new EError(...E.E303_USER_LOGGED_IN));
  }

  return User.findOne({ id })
    .then(user => {
      if (!user) {
        throw new EError(...E.E302_USER_NOT_REGISTERED);
      }

      const userPromise = Promise.resolve(user);
      const comparePromise = bcrypt.compare(password, user.password);

      return Promise.all([userPromise, comparePromise]);
    })
    .then(([user, matched]) => {
      if (!matched) throw new EError(...E.E305_USER_PASSWORD_NOT_MATCH);

      loginAs(user.id, session);
    });
};

exports.logout = session =>
  this.validateUserLoggedIn(session).then(() => {
    loginAs(undefined, session);
  });

exports.validateUserLoggedIn = session => {
  const user = loggedAs(session);
  return user ? Promise.resolve(user) : Promise.reject(new EError(...E.E304_USER_NOT_LOGGED_IN));
};

exports.getLoggedInAs = loggedAs;
