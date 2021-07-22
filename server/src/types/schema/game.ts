import { JSONSchemaType } from 'ajv';
import { PlayGameRequestBody } from '../game';

export const PlayGameRequestBodySchema: JSONSchemaType<PlayGameRequestBody> = {
  type: 'object',
  required: ['isInteractive', 'quizId'],
  additionalProperties: false,
  properties: {
    quizId: {
      type: 'string'
    },
    isInteractive: {
      type: 'boolean'
    }
  }
}
