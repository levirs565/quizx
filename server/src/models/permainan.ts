import { Schema, model, Types, Document } from 'mongoose';
import { Quiz, QuizDocument, QuizSchema } from "./quiz";

interface Permainan {
  user: string
  soalPaketID: Number
  interaktif: Boolean
  soalList: Array<Quiz>
  jawabanList: Array<number>
}

interface PermainanDocument extends Permainan, Document {
  soalList: Types.Array<QuizDocument>
  jawabanList: Types.Array<number>
}

const permainanScheme = new Schema<PermainanDocument>(
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

const Permainan = model<PermainanDocument>('Permainan', permainanScheme);

export default Permainan;
