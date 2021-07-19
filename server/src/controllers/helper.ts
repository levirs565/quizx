import { Response, Request, NextFunction } from 'express';
import { ActionSuccessResponse } from '../types/base';

export function jsonHandler<T>(fn: (req: Request) => Promise<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req)
      .then(result => res.json(result))
      .catch(next)
  }
}

export function actionHandler(fn: (req: Request) => Promise<void>) {
  return jsonHandler(async (req) => {
    await fn(req)
    return {
      success: true
    } as ActionSuccessResponse
  })
}
