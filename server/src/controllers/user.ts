import * as UserService from '../services/user';
import { SignupRequestBody, LoginRequestBody } from '../types/user';
import { actionHandler, jsonHandler, actionHandlerSchema } from './helper';

export const signup = actionHandlerSchema(SignupRequestBody, async (req) => {
  const { id, name, password } = req.body;

  await UserService.signup(id, name, password)
})

export const login = actionHandlerSchema(LoginRequestBody, async req => {
  const { id, password } = req.body;

  await UserService.login(id, password, req.session)
})

export const logout = actionHandler(async req => {
  await UserService.logout(req.session)
})

export const state = jsonHandler(async req => {
  return UserService.getState(req.session)
})
