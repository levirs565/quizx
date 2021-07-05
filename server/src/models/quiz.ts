import { Schema, Types } from 'mongoose';

export interface Quiz {
  soal: string;
  pilihan: Array<string>;
  jawaban: number;
}

export interface QuizShort {
  id: number;
  soal: string;
}

export interface QuizShortWithChoices extends QuizShort {
  pilihan: Array<string>
}

export interface QuizDetail extends Quiz {
  id: number;
  paketID: number;
}

export interface QuizDetailWithChoices extends QuizDetail {
  pilihan: Array<string>
}

export interface QuizDocument extends Quiz, Partial<Types.Subdocument> {
  toShortDetail?(id: number): QuizShort;
  toShortWithChoices?(id: number): QuizShortWithChoices
  toDetail?(id: number, paketID: number): QuizDetail;
  toDetailWithChoices?(id: number, paketID: number): QuizDetailWithChoices;
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

QuizSchema.methods.toShortDetail = function (id) {
  return {
    id,
    soal: this.soal,
  };
};

QuizSchema.methods.toShortWithChoices = function (id): QuizShortWithChoices {
  return {
    ...this.toShortDetail(),
    pilihan: this.pilihan
  }
}

QuizSchema.methods.toDetail = function (id, paketID) {
  return {
    id,
    paketID,
    soal: this.soal,
    pilihan: this.pilihan,
    jawaban: this.jawaban,
  };
};


QuizSchema.methods.toDetailWithChoices = function (id, paketID): QuizDetailWithChoices {
  return {
    ...this.toDetail(id, paketID),
    pilihan: this.pilihan
  }
}
