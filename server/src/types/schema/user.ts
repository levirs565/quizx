import { JSONSchemaType } from 'ajv';
import { LoginRequestBody, SignupRequestBody } from '../user';

export const LoginRequestBodySchema: JSONSchemaType<LoginRequestBody> = {
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

export const SignupRequestBodySchema: JSONSchemaType<SignupRequestBody> = {
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
