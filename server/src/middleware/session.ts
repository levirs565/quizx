import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connection } from 'mongoose';
import config from '../config';

const savedSession = session({
  store: new MongoStore({
    client: connection.getClient()
  }),
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false
});

export default savedSession
