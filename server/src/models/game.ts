import { Schema, model, Types, Document } from 'mongoose';
import { QuestionDocument, QuestionSchema } from './question';
import { QuestionWAnswerWoId } from '../types/quiz';
import { Game } from '../types/game';

export interface GameDB extends Omit<Game, 'id'> {
  userId: string;
  questions: Array<QuestionWAnswerWoId>;
  correctAnswers: Array<number>;
}

interface GameDocument extends GameDB, Document {
  questions: Types.DocumentArray<QuestionDocument>;
  correctAnswers: Types.Array<number>;
  toGame(): Game
}

const gameSchema = new Schema<GameDocument>(
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
      type: [QuestionSchema],
      required: true,
    },
    correctAnswers: {
      type: [Number],
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

gameSchema.methods.toGame = function (): Game {
  return {
    id: String(this._id),
    quizId: this.quizId,
    quizTitle: this.quizTitle,
    isPlaying: this.isPlaying,
    isInteractive: this.isInteractive,
    result: this.result
  }
}

const GameModel = model<GameDocument>('Game', gameSchema);

export default GameModel;
