const UserService = require('../services/user');

exports.signup = (req, res, next) => {
  const { id, name, password } = req.body;

  UserService.signup(id, name, password)
    .then(user => {
      res.json({
        msg: 'user registered'
      });
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  const { id, password } = req.body;

  UserService.login(id, password, req.session)
    .then(() => {
      res.json({
        msg: 'user logged in'
      });
    })
    .catch(next);
};

exports.logout = (req, res, next) => {
  UserService.logout(req.session)
    .then(() => {
      res.json({
        msg: 'user logged out'
      });
    })
    .catch(next);
};

exports.state = (req, res, next) => {
  Promise.resolve(UserService.getLoggedInAs(req.session))
    .then(user =>
      res.json({
        loggedIn: user != null,
        user
      })
    )
    .catch(next);
};
