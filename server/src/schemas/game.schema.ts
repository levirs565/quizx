import { Schema, model } from 'mongoose';
import { configureQuestionDiscriminators, createQuestionSchema } from './question.schema';
import { BaseModel, BaseModelSchema, configureBaseModelSchema } from './helper';
import { ExamGameData, FlashCardGameData, Game, GameType, QuestionState } from '../types/game';

const BaseGamePreferenceSchema = {
  shuffleQuestions: Boolean
}

const ExamGameDataSchema = new Schema<ExamGameData>({
  preference: {
    examTimeMinute: Number,
    ...BaseGamePreferenceSchema
  },
  maxFinishTime: Date,
});

const FlashCardGameDataSchema = new Schema<FlashCardGameData>({
  preference: {
    questionTimeMinute: Number,
    retryCount: Number,
    ...BaseGamePreferenceSchema
  },
  currentQuestionIndex: Number,
  currentQuestionMaxTime: Number,
});

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
    result: {
      required: false,
      type: {
        unanswered: Number,
        correct: Number,
        wrong: Number,
      },
    },
    startTime: {
      required: true,
      type: Date,
    },
    finishTime: {
      required: false,
      type: Date,
    },
    questions: {
      type: [questionSchema.root],
      required: true,
    },
    questionsState: {
      required: false,
      type: [
        {
          type: Number,
          enum: QuestionState,
        },
      ],
    },
    correctAnswers: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    data: {},
  },
  {
    collection: 'game',
  }
);
export const GameModelName = 'GameModel';

GameSchema.path<Schema.Types.Subdocument>('data')
  .discriminator(GameType.Exam, ExamGameDataSchema)
  .discriminator(GameType.FlashCard, FlashCardGameDataSchema);

configureQuestionDiscriminators(GameSchema, 'questions', questionSchema);
configureBaseModelSchema(GameSchema, Game);
