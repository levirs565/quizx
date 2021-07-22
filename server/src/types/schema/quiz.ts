import { JSONSchemaType } from 'ajv';
import {
  QuestionWAnswerWoId,
  QuestionWAnswer,
  AnswerQuestionRequestBody,
  CreateRenameQuizRequestBody,
} from '../quiz';

export const QuestionWAnswerWoIdSchema: JSONSchemaType<QuestionWAnswerWoId> = {
  type: 'object',
  required: ['question', 'choices', 'answer'],
  additionalProperties: false,
  properties: {
    question: {
      type: 'string',
    },
    choices: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    answer: {
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
      type: 'string',
    },
  },
};

export const AnswerQuestionRequestBodySchema: JSONSchemaType<AnswerQuestionRequestBody> = {
  type: 'object',
  required: ['answer'],
  additionalProperties: false,
  properties: {
    answer: {
      type: 'number',
    },
  },
};

export const CreateRenameQuizRequestBodySchema: JSONSchemaType<CreateRenameQuizRequestBody> = {
  type: 'object',
  required: ['title'],
  additionalProperties: false,
  properties: {
    title: {
      type: 'string'
    }
  }
}
