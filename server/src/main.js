const consts = require('./consts');

require('dotenv').config();

require('mongoose').connect(process.env.DB_URI);

const port = process.env.SERVER_PORT;
require('./app').listen(port, () => {
  console.log(consts.MSG_SERVER_READY);
});
