import { Schema, model } from 'mongoose';
import { configureQuestionDiscriminators, createQuestionSchema } from './question.schema';
import { Quiz } from '../types/quiz';
import { BaseModel, BaseModelSchema, configureBaseModelSchema } from './helper';

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
  },
  {
    collection: 'quiz',
  }
);
export const QuizModelName = 'Quiz';

configureQuestionDiscriminators(QuizSchema, 'questions', questionSchema);
configureBaseModelSchema(QuizSchema, Quiz);
