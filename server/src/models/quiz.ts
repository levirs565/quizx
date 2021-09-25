import { Schema, model } from 'mongoose';
import { configureQuestionDiscriminators, createQuestionSchema } from './question';
import { QuizWAnswer } from '../types/quiz';
import { BaseModel, BaseModelSchema, configureBaseModelSchema } from "./helper"

const questionSchema = createQuestionSchema(true)
const quizSchema: BaseModelSchema<QuizWAnswer> = new Schema(
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

configureQuestionDiscriminators(quizSchema, 'questions', questionSchema)
configureBaseModelSchema(quizSchema)

const QuizModel: BaseModel<QuizWAnswer> = model('Quiz', quizSchema);

export default QuizModel;
