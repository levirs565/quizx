import { Schema, model } from 'mongoose';
import { configureQuestionDiscriminators, createQuestionSchema } from './question';
import { Quiz } from '../types/quiz';
import { BaseModel, BaseModelSchema, configureBaseModelSchema } from "./helper"

const questionSchema = createQuestionSchema(true)
const quizSchema: BaseModelSchema<Quiz> = new Schema(
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
configureBaseModelSchema(quizSchema, Quiz)

const QuizModel: BaseModel<Quiz> = model('Quiz', quizSchema);

export default QuizModel;
