import { JSONSchema } from './base';
import { LoginRequestBody, SignupRequestBody } from '../user';

export const LoginRequestBodySchema: JSONSchema<LoginRequestBody> = {
  type: 'object',
  required: ['id', 'password'],
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
    },
    password: {
      type: 'string',
    }
  }
}

export const SignupRequestBodySchema: JSONSchema<SignupRequestBody> = {
  type: 'object',
  required: [...LoginRequestBodySchema.required, 'name'],
  additionalProperties: false,
  properties: {
    ...LoginRequestBodySchema.properties!,
    name: {
      type: 'string'
    }
  }
}
