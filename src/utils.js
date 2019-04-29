const _ = require('underscore');

function handleBaseRequest(promise, funcRes, nullMsg, req, res) {
  promise.then(
    val => {
      const isNull = _.isUndefined(val) || _.isNull(val);
      res.json({
        err: isNull,
        msg: isNull ? nullMsg : null,
        ...funcRes(val, isNull, req, res)
      });
    },
    err => {
      res.json({
        err: true,
        msg: err.toString(),
        ...funcRes(undefined, true, req, res)
      });
    }
  );
}
exports.handleBaseRequest = handleBaseRequest;
