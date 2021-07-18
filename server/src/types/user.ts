export interface UserState {
    user?: UserData
}

export interface UserData {
  id: string
  name: string
  isAdmin: boolean
}
