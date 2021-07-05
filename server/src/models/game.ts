import { Schema, model, Types, Document } from 'mongoose';
import { Quiz, QuizDocument, QuizSchema } from "./quiz";

interface Game {
  user: string
  soalPaketID: number
  interaktif: Boolean
  soalList: Array<Quiz>
  jawabanList: Array<number>
}

interface GameDocument extends Game, Document {
  soalList: Types.Array<QuizDocument>
  jawabanList: Types.Array<number>
}

const gameScheme = new Schema<GameDocument>(
  {
    user: {
      type: String,
      required: true,
      unique: true
    },
    soalPaketID: {
      type: Number,
      required: true
    },
    interaktif: {
      type: Boolean,
      required: true,
      default: false
    },
    soalList: [QuizSchema],
    jawabanList: [Number]
  },
  {
    collection: 'permaianan'
  }
);

const GameModel = model<GameDocument>('Permainan', gameScheme);

export default GameModel;
