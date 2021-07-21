import config from './config';
import { connect } from 'mongoose';
import { MSG_SERVER_READY } from './consts';

async function run() {
  await connect(config.dbUri);

  const app = (await import('./app')).default
  app.listen(config.serverPort, () => {
    console.log(MSG_SERVER_READY);
  });
}

run();
