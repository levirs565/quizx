import { Response, Request, NextFunction } from 'express';
import Ajv from 'ajv';
import { JSONSchema } from '../types/schema/base';
import { ActionSuccessResponse } from '../types/base';
import { BodyValidationError } from '../error';

export function jsonHandler<T>(fn: (req: Request) => Promise<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req)
      .then((result) => res.json(result))
      .catch(next);
  };
}

export function actionHandler(fn: (req: Request) => Promise<void>) {
  return jsonHandler(async (req) => {
    await fn(req);
    return {
      success: true,
    } as ActionSuccessResponse;
  });
}

const ajv = new Ajv({
  allErrors: true
});

export function jsonHandlerSchema<Body, Result>(
  bodySchema: JSONSchema<Body>,
  fn: (req: Request<any, any, Body>) => Promise<Result>
) {
  const validate = ajv.compile(bodySchema);
  return jsonHandler(async (req) => {
    const valid = validate(req.body);
    if (!valid) {
      throw new BodyValidationError(validate.errors!)
    }

    return await fn(req);
  });
}

export function actionHandlerSchema<T>(
  bodySchema: JSONSchema<T>,
  fn: (req: Request<{}, any, T>) => Promise<void>
) {
  const validate = ajv.compile(bodySchema);
  return actionHandler(async (req) => {
    const valid = validate(req.body);
    if (!valid) {
      throw new BodyValidationError(validate.errors!)
    }

    return await fn(req);
  });
}
