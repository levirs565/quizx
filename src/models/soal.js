const mongoose = require('mongoose');

const soalScheme = new mongoose.Schema({
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

soalScheme.methods.toShortDetail = function f(id) {
  return {
    id,
    soal: this.soal
  };
};

const collectionScheme = new mongoose.Schema(
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

collectionScheme.methods.toShortDetail = function f() {
  return {
    id: this._id,
    name: this.name
  };
};

const Soal = mongoose.model('Soal', collectionScheme);
Soal.soalScheme = soalScheme;

module.exports = Soal;
