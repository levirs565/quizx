import * as UserService from '../services/user';
import { actionHandler, jsonHandler } from './helper';

export const signup = actionHandler(async (req) => {
  const { id, name, password } = req.body;

  await UserService.signup(id, name, password)
})

export const login = actionHandler(async req => {
  const { id, password } = req.body;

  await UserService.login(id, password, req.session)
})

export const logout = actionHandler(async req => {
  await UserService.logout(req.session)
})

export const state = jsonHandler(async req => {
  return UserService.getState(req.session)
})
