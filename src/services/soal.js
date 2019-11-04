const SoalModel = require('../models/soal');

exports.get = id =>
  SoalModel.get(id).then(val =>
    val
      ? {
          id: val._id,
          soal: val.soal,
          pilihan: val.pilihan
        }
      : null
  );

exports.jawab = (id, jawaban) =>
  SoalModel.get(id).then(val => (val ? val.jawaban === jawaban : null));
