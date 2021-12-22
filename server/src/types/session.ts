import { UserData } from './user';

declare module 'express-session' {
  interface SessionData {
    user?: UserData;
  }
}

export default interface Session {
  user?: UserData;
}
