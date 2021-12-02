import { EError, BodyValidationError } from '../error';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ErrorResponse } from '../types/base';
import { ValidationError } from 'class-validator';
import { BadRequestError } from 'routing-controllers';

const handler: ErrorRequestHandler = function(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response: ErrorResponse = {
    error: {
      message: String(err.message),
      code: 0
    }
  };
  if (err instanceof EError) {
    response.error.code = err.code;
  } else if (err instanceof BadRequestError) {
    response.error.code = 101;
    response.error.message = 'Request body invalid';
  } else {
    console.log('%O', err);
    response.error.code = 100;
  }

  res.json(response);
};

export default handler;
