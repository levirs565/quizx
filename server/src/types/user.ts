export interface UserState {
    user?: UserData
}

export interface UserData {
  id: string
  name: string
  isAdmin: boolean
}

// WARNING: Change schema if change this interface
export interface LoginRequestBody {
  id: string
  password: string
}

// WARNING: Change schema if change this interface
export interface SignupRequestBody extends LoginRequestBody {
  name: string
}
