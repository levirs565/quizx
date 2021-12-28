import { Schema, model } from 'mongoose';
import { configureQuestionDiscriminators, createQuestionSchema } from './question.schema';
import { BaseModel, BaseModelSchema, configureBaseModelSchema } from './helper';
import { Game, QuestionState } from '../types/game';

const questionSchema = createQuestionSchema(false);
export const GameSchema: BaseModelSchema<Game> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    quizId: {
      type: String,
      required: true,
    },
    quizTitle: {
      type: String,
      required: true,
    },
    isPlaying: {
      type: Boolean,
      required: true,
      default: true,
    },
    isInteractive: {
      type: Boolean,
      required: true,
      default: false,
    },
    shuffleQuestions: {
      type: Boolean,
      required: true,
      default: false,
    },
    questions: {
      type: [questionSchema.root],
      required: true,
    },
    correctAnswers: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    result: {
      required: false,
      type: {
        unanswered: Number,
        correct: Number,
        wrong: Number,
        questionsState: [
          {
            type: Number,
            enum: QuestionState,
          },
        ],
      },
    },
  },
  {
    collection: 'game',
  }
);
export const GameModelName = 'GameModel';

configureQuestionDiscriminators(GameSchema, 'questions', questionSchema);
configureBaseModelSchema(GameSchema, Game);
