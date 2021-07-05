import { Document, Schema, model, Types } from "mongoose"
import { Quiz, QuizDocument, QuizSchema } from "./quiz"

interface QuizPackage {
  _id: Number
  name: string
  soalList: Array<Quiz>
}

interface QuizPackageShort {
  id: Number
  name: string
}

export interface QuizPackageDocument extends QuizPackage, Omit<Document, "_id"> {
  soalList: Types.Array<QuizDocument>
  toShortDetail(): QuizPackageShort
}

const paketScheme = new Schema<QuizPackageDocument>(
  {
    _id: Number,
    name: {
      type: String,
      required: true
    },
    soalList: [QuizSchema]
  },
  {
    collection: 'soal'
  }
);

paketScheme.methods.toShortDetail = function () {
  return {
    id: this._id,
    name: this.name
  };
};

const Soal = model<QuizPackageDocument>('Soal', paketScheme);

export default Soal
