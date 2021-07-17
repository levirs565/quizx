import { EError } from '../error';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const handler: ErrorRequestHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = String(err.message);
  let code: number;
  if (err instanceof EError) {
    code = err.code;
  } else {
    console.log('%O', err);
    code = 100;
  }

  res.json({
    error: {
      message,
      code,
    },
  });
};

export default handler;
