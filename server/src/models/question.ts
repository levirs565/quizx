import { Schema, Types } from 'mongoose';
import { Question, QuestionWAnswer, QuestionWAnswerWoId } from '../types/quiz'

export interface QuestionDocument extends QuestionWAnswerWoId, Types.Subdocument {
  toQuestion?(): Question
  toQuestionWAnswer?(): QuestionWAnswer;
}

export const QuestionSchema = new Schema<QuestionDocument>({
  soal: {
    type: String,
    required: true,
  },
  pilihan: {
    type: Array,
    required: true,
  },
  jawaban: {
    type: Number,
    required: true,
  },
});

QuestionSchema.methods.toQuestion = function (): Question {
  return {
    id: this._id,
    soal: this.soal,
    pilihan: this.pilihan
  }
}

QuestionSchema.methods.toQuestionWAnswer = function (id): QuestionWAnswer {
  return {
    id: this._id,
    soal: this.soal,
    pilihan: this.pilihan,
    jawaban: this.jawaban
  } 
}
