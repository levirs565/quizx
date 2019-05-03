const mongoose = require('mongoose');
const _ = require('underscore');

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

function getSoal(id) {
  return Soal.findById(id);
}
exports.getSoal = getSoal;

function createRandomSoalCollection(size) {
  return Soal.find().then(val => {
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
}
exports.createRandomSoalCollection = createRandomSoalCollection;

function calculateResults(soals, jawabans) {
  console.log(jawabans);
  const resuls = {
    benar: [],
    salah: [],
    takDiJawab: []
  };

  soals.forEach((soal, index) => {
    const jawaban = jawabans[index];
    const takDiJawab = _.isNull(jawaban) || _.isUndefined(jawaban);

    if (takDiJawab) {
      resuls.takDiJawab.push(index);
      return;
    }

    const benar = soal.jawaban === jawaban;

    if (benar) {
      resuls.benar.push(index);
    } else {
      resuls.salah.push(index);
    }
  });

  return resuls;
}
exports.calculateResults = calculateResults;
