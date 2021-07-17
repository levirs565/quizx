import { Schema, Types } from 'mongoose';

export interface Question {
  id: number;
  soal: string;
  pilihan: Array<string>
}

export interface QuestionWAnswer extends Question {
  jawaban: number
}

export type QuestionWAnswerWoId = Omit<QuestionWAnswer, 'id'>

export interface QuizDocument extends QuestionWAnswerWoId, Partial<Types.Subdocument> {
  toQuestion?(id: number): Question
  toQuestionWAnswer?(id: number): QuestionWAnswer;
}

export const QuizSchema = new Schema<QuizDocument>({
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

QuizSchema.methods.toQuestion = function (id): Question {
  return {
    id,
    soal: this.soal,
    pilihan: this.pilihan
  }
}

QuizSchema.methods.toQuestionWAnswer = function (id): QuestionWAnswer {
  return {
    id,
    soal: this.soal,
    pilihan: this.pilihan,
    jawaban: this.jawaban
  } 
}
