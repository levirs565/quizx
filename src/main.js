const consts = require('./consts');

require('mongoose').connect(consts.DB_SOALKU);

require('./app').listen(3000, () => {
  console.log(consts.MSG_SERVER_READY);
});

require('./api/base');
