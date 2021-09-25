import { Schema, model } from 'mongoose';
import { configureQuestionDiscriminators, createQuestionSchema } from './question';
import { QuestionOptionalAnswer } from '../types/quiz';
import { Game } from '../types/game';
import { BaseModel, BaseModelSchema, configureBaseModelSchema } from './helper';

export interface GameDB extends Game {
  userId: string;
  questions: Array<QuestionOptionalAnswer>;
  correctAnswers: Array<number>;
}

const questionSchema = createQuestionSchema(false)
const gameSchema: BaseModelSchema<GameDB> = new Schema(
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
    questions: {
      type: [questionSchema.root],
      required: true,
    },
    correctAnswers: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    result: {
      notAnswered: Number,
      correct: Number,
      wrong: Number,
    },
  },
  {
    collection: 'game',
  }
);


configureQuestionDiscriminators(gameSchema, 'questions', questionSchema)
configureBaseModelSchema(gameSchema)

const GameModel: BaseModel<GameDB> = model('Game', gameSchema);

export default GameModel;
