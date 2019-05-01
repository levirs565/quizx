const _ = require('underscore');

function handleRequest(promise, funcRes, nullMsg, req, res) {
  console.log(`TRACE for request ${req.url}`);
  console.log(`\tPARAMS ${JSON.stringify(req.params)}`);
  console.log(`\tBODY ${JSON.stringify(req.body)}`);
  promise.then(
    val => {
      const isNull = _.isUndefined(val) || _.isNull(val);
      res.json({
        err: isNull,
        msg: isNull ? nullMsg : null,
        ...funcRes(val, isNull)
      });
    },
    err => {
      if (typeof err === 'object') {
        console.log(err);
      }

      res.json({
        err: true,
        msg: err.toString(),
        ...funcRes(undefined, true)
      });
    }
  );
}
exports.handleRequest = handleRequest;
