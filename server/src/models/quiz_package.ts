import { Document, Schema, model, Types } from 'mongoose';
import { Quiz, QuizShort, QuizDocument, QuizSchema } from './quiz';

interface QuizPackage {
  _id: number;
  name: string;
  soalList: Array<Quiz>;
}

interface QuizPackageInformation {
  id: number;
  name: string;
}

interface QuizPackageInformationWithQuizCount extends QuizPackageInformation {
  soalCount: number;
}

interface QuizPackageShort extends QuizPackageInformation {
  soalList: Array<QuizShort>;
}

export interface QuizPackageDocument extends QuizPackage, Omit<Document, '_id'> {
  soalList: Types.Array<QuizDocument>;
  getInformationOnly(): QuizPackageInformation;
  getInformationWithQuizCount(): QuizPackageInformationWithQuizCount;
  toShort(): QuizPackageShort;
}

const paketScheme = new Schema<QuizPackageDocument>(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
    },
    soalList: [QuizSchema],
  },
  {
    collection: 'soal',
  }
);

paketScheme.methods.getInformationOnly = function () {
  return {
    id: this._id,
    name: this.name,
  };
};

paketScheme.methods.getInformationWithQuizCount = function () {
  return {
    ...this.getInformationOnly(),
    soalCount: this.soalList.length,
  };
};

paketScheme.methods.toShort = function () {
  return {
    ...this.getInformationOnly(),
    soalList: this.soalList.map((item, idx) => item.toShortWithChoices(idx)),
  } as QuizPackageShort;
};

const Soal = model<QuizPackageDocument>('Soal', paketScheme);

export default Soal;
