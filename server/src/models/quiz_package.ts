import { Document, Schema, model, Types } from "mongoose"
import { Quiz, QuizDocument, QuizSchema } from "./quiz"

interface QuizPackage {
  _id: number
  name: string
  soalList: Array<Quiz>
}

interface QuizPackageInformation {
  id: number
  name: string
}

export interface QuizPackageDocument extends QuizPackage, Omit<Document, "_id"> {
  soalList: Types.Array<QuizDocument>
  getInformationOnly(): QuizPackageInformation
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

paketScheme.methods.getInformationOnly = function () {
  return {
    id: this._id,
    name: this.name
  };
};

const Soal = model<QuizPackageDocument>('Soal', paketScheme);

export default Soal
