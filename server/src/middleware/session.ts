import * as session from 'express-session';
import * as ConnectMongo from 'connect-mongo';
import { connection } from 'mongoose';

const MongoStore = ConnectMongo(session);
const savedSession = session({
  store: new MongoStore({
    mongooseConnection: connection
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
});

export default savedSession
