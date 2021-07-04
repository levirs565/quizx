const mongoose = require('mongoose');
const QuizSchema = require("./quiz").QuizSchema

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
    soalList: [QuizSchema],
    jawabanList: [Number]
  },
  {
    collection: 'permaianan'
  }
);

const Permainan = mongoose.model('Permainan', permainanScheme);

module.exports = Permainan;
