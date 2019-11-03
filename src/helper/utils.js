const _ = require('underscore');

function handleRequest(funcProc, funcRes, nullMsg, req, res) {
  console.log(`TRACE for request ${req.url}`);
  console.log(`\tPARAMS ${JSON.stringify(req.params)}`);
  console.log(`\tBODY ${JSON.stringify(req.body)}`);
  new Promise(funcProc).then(
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
        msg: String(err)
      });
    }
  );
}
exports.handleRequest = handleRequest;
