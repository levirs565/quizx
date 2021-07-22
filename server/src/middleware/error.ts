import { EError, BodyValidationError } from '../error';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ErrorResponse } from '../types/base';

const handler: ErrorRequestHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error: ErrorResponse = {
    message: String(err.message),
    code: 0,
  }
  if (err instanceof EError) {
    error.code = err.code;
  } else if (err instanceof BodyValidationError) {
    error.code = 101
    error.message = "Request body invalid"
    error.validationMessages = err.errors.map(e => e.message!)
  } else {
    console.log('%O', err);
    error.code = 100;
  }

  res.json(error);
};

export default handler;
