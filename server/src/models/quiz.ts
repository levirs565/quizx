import { Document, Schema, model, Types } from 'mongoose';
import { QuestionSchema, QuestionDocument } from './question';
import { Quiz, QuizSummary, QuizWAnswer, QuestionWAnswerWoId } from '../types/quiz';

export interface QuizDB {
  userId: string;
  title: string;
  questions: Array<QuestionWAnswerWoId>;
}

export interface QuizDocument extends QuizDB, Document {
  questions: Types.DocumentArray<QuestionDocument>;
  toSummary(): QuizSummary;
  toQuiz(): Quiz;
  toQuizWAnswer(): QuizWAnswer;
}

const quizSchema = new Schema<QuizDocument>(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: [QuestionSchema],
  },
  {
    collection: 'quiz',
  }
);

quizSchema.methods.toSummary = function (): QuizSummary {
  return {
    id: this._id,
    userId: this.userId,
    title: this.title,
    questionCount: this.questions.length,
  };
};

quizSchema.methods.toQuiz = function (): Quiz {
  return {
    id: this._id,
    userId: this.userId,
    title: this.title,
    questions: this.questions.map((item, idx) => item.toQuestion!()),
  };
};

quizSchema.methods.toQuizWAnswer = function (): QuizWAnswer {
  return {
    id: this._id,
    userId: this.userId,
    title: this.title,
    questions: this.questions.map((item, idx) => item.toQuestionWAnswer!()),
  };
};

const QuizModel = model<QuizDocument>('Quiz', quizSchema);

export default QuizModel;
