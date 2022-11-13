import { UserData } from '@quizx/shared';

declare module 'express-session' {
  interface SessionData {
    user?: UserData;
  }
}

export default interface Session {
  user?: UserData;
}
