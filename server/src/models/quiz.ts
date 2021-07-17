import { Document, Schema, model, Types } from 'mongoose';
import { QuestionWAnswerWoId, Question, QuestionSchema, QuestionDocument, QuestionWAnswer } from './question';

interface QuizDB {
  _id: number;
  name: string;
  soalList: Array<QuestionWAnswerWoId>;
}

interface BaseQuiz {
  id: number;
  name: string;
}

interface QuizSummary extends BaseQuiz {
  soalCount: number;
}

interface Quiz extends BaseQuiz {
  soalList: Array<Question>;
}

interface QuizWAnswer extends BaseQuiz {
  soalList: Array<QuestionWAnswer>;
}

export interface QuizDocument extends QuizDB, Omit<Document, '_id'> {
  soalList: Types.Array<QuestionDocument>;
  toSummary(): QuizSummary;
  toQuiz(): Quiz;
  toQuizWAnswer(): QuizWAnswer;
}

const paketScheme = new Schema<QuizDocument>(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
    },
    soalList: [QuestionSchema],
  },
  {
    collection: 'soal',
  }
);

paketScheme.methods.toSummary = function (): QuizSummary {
  return {
    id: this._id,
    name: this.name,
    soalCount: this.soalList.length,
  };
};

paketScheme.methods.toQuiz = function (): Quiz {
  return {
    id: this._id,
    name: this.name,
    soalList: this.soalList.map((item, idx) => item.toQuestion(idx)),
  } as Quiz;
};

paketScheme.methods.toQuizWAnswer = function (): QuizWAnswer {
  return {
    id: this._id,
    name: this.name,
    soalList: this.soalList.map((item, idx) => item.toQuestionWAnswer(idx)),
  };
};

const QuizModel = model<QuizDocument>('Soal', paketScheme);

export default QuizModel;
