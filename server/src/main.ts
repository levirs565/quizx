import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { MSG_SERVER_READY } from './consts';

async function run() {
  dotenv.config();

  await connect(process.env.DB_URI);

  const port = process.env.SERVER_PORT;
  const app = (await import('./app')).default
  app.listen(port, () => {
    console.log(MSG_SERVER_READY);
  });
}

run();
