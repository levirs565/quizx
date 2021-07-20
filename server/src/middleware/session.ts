import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connection } from 'mongoose';


const savedSession = session({
  store: new MongoStore({
    client: connection.getClient()
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
});

export default savedSession
