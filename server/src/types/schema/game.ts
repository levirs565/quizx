import { JSONSchemaType } from 'ajv';
import { PlayGameRequestBody } from '../game';

export const PlayGameRequestBodySchema: JSONSchemaType<PlayGameRequestBody> = {
  type: 'object',
  required: ['interaktif'],
  additionalProperties: false,
  properties: {
    soalId: {
      type: 'number'
    },
    interaktif: {
      type: 'boolean'
    }
  }
}
