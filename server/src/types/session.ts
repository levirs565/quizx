interface SessionUser {
  id: string
  name: string
  isAdmin: boolean
}

export default interface Session {
  user?: SessionUser
}
