
import { SchemaDefinition } from "./base"

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

// Begin Generated Schema Definition
export const UserState: SchemaDefinition<UserState> = {
  name: "UserState"
}
export const UserData: SchemaDefinition<UserData> = {
  name: "UserData"
}
export const LoginRequestBody: SchemaDefinition<LoginRequestBody> = {
  name: "LoginRequestBody"
}
export const SignupRequestBody: SchemaDefinition<SignupRequestBody> = {
  name: "SignupRequestBody"
}
// End Generated Schema Definition