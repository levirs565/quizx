import { Document, Schema, model, Types } from "mongoose"

interface Quiz {
  soal: string,
  pilihan: Array<string>,
  jawaban: Number
}

interface QuizDocumentShort {
  id: Number,
  soal: string
}

interface QuizDocument extends Quiz, Partial<Types.Subdocument> {
  toShortDetail?(id: Number): QuizDocumentShort
  toDetail?(): Quiz
}

const soalScheme = new Schema<QuizDocument>({
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

soalScheme.methods.toShortDetail = function (id) {
  return {
    id,
    soal: this.soal
  };
};

soalScheme.methods.toDetail = function () {
  return {
    soal: this.soal,
    pilihan: this.pilihan,
    jawaban: this.jawaban
  };
};

interface QuizPackage {
  _id: Number
  name: string
  soalList: Array<Quiz>
}

interface QuizPackageShort {
  id: Number
  name: string
}

interface QuizPackageDocument extends QuizPackage, Omit<Document, "_id"> {
  soalList: Types.Array<QuizDocument>
  toShortDetail(): QuizPackageShort
}

const paketScheme = new Schema<QuizPackageDocument>(
  {
    _id: Number,
    name: {
      type: String,
      required: true
    },
    soalList: [soalScheme]
  },
  {
    collection: 'soal'
  }
);

paketScheme.methods.toShortDetail = function () {
  return {
    id: this._id,
    name: this.name
  };
};

const Soal = model<QuizPackageDocument>('Soal', paketScheme);
Soal["soalScheme"] = soalScheme;

export default Soal
