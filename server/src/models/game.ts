import { Schema, model, Types, Document } from 'mongoose';
import { QuestionWAnswerWoId, QuestionDocument, QuestionSchema } from "./question";

export interface Game {
  user: string
  soalPaketID: number
  interaktif: Boolean
  soalList: Array<QuestionWAnswerWoId>
  jawabanList: Array<number>
}

interface GameDocument extends Game, Document {
  soalList: Types.Array<QuestionDocument>
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
    soalList: [QuestionSchema],
    jawabanList: [Number]
  },
  {
    collection: 'permaianan'
  }
);

const GameModel = model<GameDocument>('Permainan', gameScheme);

export default GameModel;
