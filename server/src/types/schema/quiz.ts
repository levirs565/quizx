import { JSONSchema } from './base';
import {
  QuestionWAnswerWoId,
  QuestionWAnswer,
  AnswerQuestionRequestBody,
  CreateRenameQuizRequestBody,
  QuizWAnswer
} from '../quiz';

export const QuestionWAnswerWoIdSchema: JSONSchema<QuestionWAnswerWoId> = {
  type: 'object',
  required: ['question', 'choices', 'answer'],
  additionalProperties: false,
  properties: {
    question: {
      type: 'string'
    },
    choices: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    answer: {
      type: 'number'
    }
  }
};

export const QuestionWAnswerSchema: JSONSchema<QuestionWAnswer> = {
  type: 'object',
  required: [...QuestionWAnswerWoIdSchema.required, 'id'],
  additionalProperties: false,
  properties: {
    ...QuestionWAnswerWoIdSchema.properties!,
    id: {
      type: 'string'
    }
  }
};

export const QuizWAnswerSchema: JSONSchema<QuizWAnswer> = {
  properties: {
    id: {
      type: 'string'
    },
    questions: {
      items: {
        ...QuestionWAnswerSchema
      },
      type: 'array'
    },
    title: {
      type: 'string'
    },
    userId: {
      type: 'string'
    }
  },
  type: 'object',
  required: ["id", "questions", "title", "userId"],
  additionalProperties: false
};

export const AnswerQuestionRequestBodySchema: JSONSchema<AnswerQuestionRequestBody> = {
  type: 'object',
  required: ['answer'],
  additionalProperties: false,
  properties: {
    answer: {
      type: 'number'
    }
  }
};

export const CreateRenameQuizRequestBodySchema: JSONSchema<CreateRenameQuizRequestBody> = {
  type: 'object',
  required: ['title'],
  additionalProperties: false,
  properties: {
    title: {
      type: 'string'
    }
  }
};
