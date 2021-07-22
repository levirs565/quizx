import { Schema, Types } from 'mongoose';
import { Question, QuestionWAnswer, QuestionWAnswerWoId } from '../types/quiz'

export interface QuestionDocument extends QuestionWAnswerWoId, Types.Subdocument {
  toQuestion?(): Question
  toQuestionWAnswer?(): QuestionWAnswer;
}

export const QuestionSchema = new Schema<QuestionDocument>({
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: Array,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
});

QuestionSchema.methods.toQuestion = function (): Question {
  return {
    id: this._id,
    question: this.question,
    choices: this.choices
  }
}

QuestionSchema.methods.toQuestionWAnswer = function (id): QuestionWAnswer {
  return {
    id: this._id,
    question: this.question,
    choices: this.choices,
    answer: this.answer
  } 
}
