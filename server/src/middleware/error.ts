import { EError, BodyValidationError } from '../error';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ErrorResponse } from '../types/base';

const handler: ErrorRequestHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response: ErrorResponse = {
    error: {
      message: String(err.message),
      code: 0,
    }
  }
  if (err instanceof EError) {
    response.error.code = err.code;
  } else if (err instanceof BodyValidationError) {
    response.error.code = 101
    response.error.message = "Request body invalid"
    response.error.validationMessages = err.errors.map(e => e.message!)
  } else {
    console.log('%O', err);
    response.error.code = 100;
  }

  res.json(response);
};

export default handler;
