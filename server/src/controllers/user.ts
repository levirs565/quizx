import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user';

export function signup(req: Request, res: Response, next: NextFunction) {
  const { id, name, password } = req.body;

  UserService.signup(id, name, password)
    .then(() => {
      res.json({
        msg: 'user registered'
      });
    })
    .catch(next);
}

export function login(req: Request, res: Response, next: NextFunction) {
  const { id, password } = req.body;

  UserService.login(id, password, req.session)
    .then(() => {
      res.json({
        msg: 'user logged in'
      });
    })
    .catch(next);
}

export function logout(req: Request, res: Response, next: NextFunction) {
  UserService.logout(req.session)
    .then(() => {
      res.json({
        msg: 'user logged out'
      });
    })
    .catch(next);
}

export function state(req: Request, res: Response, next: NextFunction) {
  res.json(UserService.getState(req.session))
}
