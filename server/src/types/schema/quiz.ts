import { JSONSchemaType } from 'ajv';
import {
  QuestionWAnswerWoId,
  QuestionWAnswer,
  AnswerQuestionRequestBody,
  CreateRenameQuizRequestBody,
} from '../quiz';

export const QuestionWAnswerWoIdSchema: JSONSchemaType<QuestionWAnswerWoId> = {
  type: 'object',
  required: ['soal', 'pilihan', 'jawaban'],
  additionalProperties: false,
  properties: {
    soal: {
      type: 'string',
    },
    pilihan: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    jawaban: {
      type: 'number',
    },
  },
};

export const QuestionWAnswerSchema: JSONSchemaType<QuestionWAnswer> = {
  type: 'object',
  required: [...QuestionWAnswerWoIdSchema.required, 'id'],
  additionalProperties: false,
  properties: {
    ...QuestionWAnswerWoIdSchema.properties!,
    id: {
      type: 'number',
    },
  },
};

export const AnswerQuestionRequestBodySchema: JSONSchemaType<AnswerQuestionRequestBody> = {
  type: 'object',
  required: ['jawaban'],
  additionalProperties: false,
  properties: {
    jawaban: {
      type: 'number',
    },
  },
};

export const CreateRenameQuizRequestBodySchema: JSONSchemaType<CreateRenameQuizRequestBody> = {
  type: 'object',
  required: ['name'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string'
    }
  }
}
