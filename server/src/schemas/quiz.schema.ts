import { Schema } from 'mongoose';
import { configureQuestionDiscriminators, createQuestionSchema } from './question.schema.js';
import { Quiz } from '@quizx/shared';
import { BaseModelSchema, configureBaseModelSchema } from './helper.js';

const questionSchema = createQuestionSchema(true);
export const QuizSchema: BaseModelSchema<Quiz> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema.root],
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    collection: 'quiz',
  }
);
export const QuizModelName = 'Quiz';

configureQuestionDiscriminators(QuizSchema, 'questions', questionSchema);
configureBaseModelSchema(QuizSchema, Quiz);
