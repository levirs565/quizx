import { Schema, model } from 'mongoose';
import { configureQuestionDiscriminators, createQuestionSchema } from './question.schema';
import { BaseModel, BaseModelSchema, configureBaseModelSchema } from './helper';
import { ExamGameData, FlashCardGameData, Game, GameType, QuestionState } from '../types/game';

const BaseGamePreferenceSchema = {
  shuffleQuestions: {
    required: true,
    type: Boolean,
  },
};

const ExamGameDataSchema = new Schema<ExamGameData>({
  preference: {
    examTimeMinute: {
      required: false,
      type: Number,
    },
    ...BaseGamePreferenceSchema,
  },
  maxFinishTime: {
    required: false,
    type: Date,
  },
});

const FlashCardGameDataSchema = new Schema<FlashCardGameData>({
  preference: {
    questionTimeMinute: {
      type: Number,
      required: false,
    },
    retryCount: {
      type: Number,
      required: false,
    },
    ...BaseGamePreferenceSchema,
  },
  currentQuestionIndex: Number,
  currentQuestionMaxTime: {
    required: false,
    type: Date,
  },
  currentQuestionRetryCount: {
    required: false,
    type: Number,
  },
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
    data: {
      type: new Schema({}, { discriminatorKey: 'type' }),
      required: true,
    },
  },
  {
    collection: 'game',
  }
);

export const GameModelName = 'GameModel';

const dataSubdocument = GameSchema.path<Schema.Types.Subdocument>('data')
dataSubdocument.discriminator(GameType.Exam, ExamGameDataSchema);
dataSubdocument.discriminator(GameType.FlashCard, FlashCardGameDataSchema);

configureQuestionDiscriminators(GameSchema, 'questions', questionSchema);
configureBaseModelSchema(GameSchema, Game);
