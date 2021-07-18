interface SessionUser {
  id: string
  name: string
  isAdmin: boolean
}

declare module 'express-session' {
  interface SessionData {
    user?: SessionUser
  }
}

export default interface Session {
  user?: SessionUser
}
