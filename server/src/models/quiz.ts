import { Document, Schema, model, Types } from 'mongoose';
import { QuestionWAnswerWoId, Question, QuestionWAnswer, QuizDocument, QuizSchema } from './question';

interface QuizPackage {
  _id: number;
  name: string;
  soalList: Array<QuestionWAnswerWoId>;
}

interface QuizPackageInformation {
  id: number;
  name: string;
}

interface QuizPackageInformationWithQuizCount extends QuizPackageInformation {
  soalCount: number;
}

interface QuizPackageShort extends QuizPackageInformation {
  soalList: Array<Question>;
}

interface AdminQuizPackage extends QuizPackageInformation {
  soalList: Array<QuestionWAnswer>;
}

export interface QuizPackageDocument extends QuizPackage, Omit<Document, '_id'> {
  soalList: Types.Array<QuizDocument>;
  getInformationOnly(): QuizPackageInformation;
  getInformationWithQuizCount(): QuizPackageInformationWithQuizCount;
  toShort(): QuizPackageShort;
  toForAdmin(): AdminQuizPackage;
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
    soalList: this.soalList.map((item, idx) => item.toQuestion(idx)),
  } as QuizPackageShort;
};

paketScheme.methods.toForAdmin = function (): AdminQuizPackage {
  return {
    ...this.getInformationOnly(),
    soalList: this.soalList.map((item, idx) => item.toQuestionWAnswer(idx)),
  };
};

const Soal = model<QuizPackageDocument>('Soal', paketScheme);

export default Soal;
