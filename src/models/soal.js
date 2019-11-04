const mongoose = require('mongoose');

const soalScheme = new mongoose.Schema(
  {
    _id: Number,
    soal: String,
    pilihan: Array,
    jawaban: Number
  },
  {
    collection: 'soal'
  }
);

const Soal = mongoose.model('Soal', soalScheme);

exports.get = id => Soal.findById(id);

exports.createRandom = size =>
  Soal.find().then(val => {
    const soals = val;
    const count = val.length;
    const result = [];

    while (result.length < size) {
      let index = Math.floor(Math.random() * count);
      if (index === count) {
        index = count - 1;
      }

      result.push(soals[index]);
    }

    return result;
  });
