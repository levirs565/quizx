import { JSONSchemaType } from 'ajv';
import { PlayGameRequestBody } from '../game';

export const PlayGameRequestBodySchema: JSONSchemaType<PlayGameRequestBody> = {
  type: 'object',
  required: ['interaktif', 'soalId'],
  additionalProperties: false,
  properties: {
    soalId: {
      type: 'string'
    },
    interaktif: {
      type: 'boolean'
    }
  }
}
