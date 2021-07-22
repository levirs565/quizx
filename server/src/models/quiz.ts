import { Document, Schema, model, Types } from 'mongoose';
import { QuestionSchema, QuestionDocument } from './question';
import { Quiz, QuizSummary, QuizWAnswer, QuestionWAnswerWoId } from '../types/quiz';

interface QuizDB {
  name: string;
  soalList: Array<QuestionWAnswerWoId>;
}

export interface QuizDocument extends QuizDB, Document {
  soalList: Types.DocumentArray<QuestionDocument>;
  toSummary(): QuizSummary;
  toQuiz(): Quiz;
  toQuizWAnswer(): QuizWAnswer;
}

const quizSchema = new Schema<QuizDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    soalList: [QuestionSchema],
  },
  {
    collection: 'quiz',
  }
);

quizSchema.methods.toSummary = function (): QuizSummary {
  return {
    id: this._id,
    name: this.name,
    soalCount: this.soalList.length,
  };
};

quizSchema.methods.toQuiz = function (): Quiz {
  return {
    id: this._id,
    name: this.name,
    soalList: this.soalList.map((item, idx) => item.toQuestion!()),
  } as Quiz;
};

quizSchema.methods.toQuizWAnswer = function (): QuizWAnswer {
  return {
    id: this._id,
    name: this.name,
    soalList: this.soalList.map((item, idx) => item.toQuestionWAnswer!()),
  };
};

const QuizModel = model<QuizDocument>('Quiz', quizSchema);

export default QuizModel;
