import { JSONSchema } from './base';
import { PlayGameRequestBody } from '../game';

export const PlayGameRequestBodySchema: JSONSchema<PlayGameRequestBody> = {
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
