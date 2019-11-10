const SoalModel = require('../models/soal');

exports.getCollectionList = () =>
  SoalModel.find().then(list =>
    list.map(val => ({ ...val.toShortDetail(), soalCount: val.soalList.length }))
  );

exports.getCollectionFull = id => SoalModel.findById(id);

exports.getCollection = id =>
  this.getCollectionFull(id).then(val =>
    val
      ? {
          ...val.toShortDetail(),
          soalList: val.soalList.map((item, idx) => item.toShortDetail(idx))
        }
      : null
  );

exports.getSoalFull = (colId, soalId) =>
  this.getCollectionFull(colId).then(collection => collection.soalList[soalId]);

exports.getSoal = (colId, soalId) =>
  this.getSoalFull(colId, soalId).then(item =>
    item
      ? {
          ...item.toShortDetail(soalId),
          collectionId: colId,
          pilihan: item.pilihan
        }
      : null
  );

exports.jawabSoal = (colId, soalId, jawaban) =>
  this.getSoalFull(colId, soalId).then(item => (item ? Boolean(item.jawaban === jawaban) : null));
