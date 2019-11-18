const mongoose = require('mongoose');
const { soalScheme } = require('./soal');

const permainanScheme = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true
    },
    soalPaketID: {
      type: Number,
      rquired: true
    },
    soalList: [soalScheme],
    jawabanList: [Number]
  },
  {
    collation: 'permaianan'
  }
);

const Permainan = mongoose.model('Permainan', permainanScheme);

module.exports = Permainan;
