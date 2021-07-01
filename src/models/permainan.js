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
      required: true
    },
    interaktif: {
      type: Boolean,
      required: true,
      default: false
    },
    soalList: [soalScheme],
    jawabanList: [Number]
  },
  {
    collection: 'permaianan'
  }
);

const Permainan = mongoose.model('Permainan', permainanScheme);

module.exports = Permainan;
