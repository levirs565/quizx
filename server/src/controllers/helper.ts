import { Response, Request, NextFunction } from 'express';
import { ajv } from "../validation";
import { ActionSuccessResponse, SchemaDefinition } from '../types/base';
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

export function jsonHandlerSchema<Body, Result>(
  bodySchema: SchemaDefinition<Body>,
  fn: (req: Request<any, any, Body>) => Promise<Result>
) {
  const validate = ajv.getSchema(`#/definitions/${bodySchema.name}`)!;
  return jsonHandler(async (req) => {
    const valid = validate(req.body);
    if (!valid) {
      throw new BodyValidationError(validate.errors!)
    }

    return await fn(req);
  });
}

export function actionHandlerSchema<Body>(
  bodySchema: SchemaDefinition<Body>,
  fn: (req: Request<{}, any, Body>) => Promise<void>
) {
  return jsonHandlerSchema(bodySchema, fn)
}
