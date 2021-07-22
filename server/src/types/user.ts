export interface UserState {
    user?: UserData
}

export interface UserData {
  id: string
  name: string
  isAdmin: boolean
}

export interface LoginRequestBody {
  id: string
  password: string
}

export interface SignupRequestBody extends LoginRequestBody {
  name: string
}
