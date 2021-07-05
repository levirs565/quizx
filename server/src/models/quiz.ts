import { Schema, Types } from "mongoose"

export interface Quiz {
  soal: string,
  pilihan: Array<string>,
  jawaban: number
}

export interface QuizShort {
  id: number,
  soal: string
}

export interface QuizDocument extends Quiz, Partial<Types.Subdocument> {
  toShortDetail?(id: number): QuizShort
  toDetail?(): Quiz
}

export const QuizSchema = new Schema<QuizDocument>({
  soal: {
    type: String,
    required: true
  },
  pilihan: {
    type: Array,
    required: true
  },
  jawaban: {
    type: Number,
    required: true
  }
});

QuizSchema.methods.toShortDetail = function (id) {
  return {
    id,
    soal: this.soal
  };
};

QuizSchema.methods.toDetail = function () {
  return {
    soal: this.soal,
    pilihan: this.pilihan,
    jawaban: this.jawaban
  };
};
