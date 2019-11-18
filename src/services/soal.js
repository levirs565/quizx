const SoalModel = require('../models/soal');
const { EError, E } = require('../error');

exports.getCollectionList = () =>
  SoalModel.find().then(list =>
    list.map(val => ({ ...val.toShortDetail(), soalCount: val.soalList.length }))
  );

exports.getCollectionFull = id =>
  SoalModel.findById(id).then(val => {
    if (!val) throw new EError(...E.E201_SOAL_COLLECTION_NOT_FOUND);

    return val;
  });

exports.getCollection = id =>
  this.getCollectionFull(id).then(val => {
    return {
      ...val.toShortDetail(),
      soalList: val.soalList.map((item, idx) => item.toShortDetail(idx))
    };
  });

exports.getSoalFull = (colId, soalId) =>
  this.getCollectionFull(colId)
    .then(collection => collection.soalList[soalId])
    .then(item => {
      if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
      return item;
    });

exports.getSoal = (colId, soalId) =>
  this.getSoalFull(colId, soalId).then(item => {
    return {
      ...item.toShortDetail(soalId),
      collectionId: colId,
      pilihan: item.pilihan
    };
  });

exports.jawabSoal = (colId, soalId, jawaban) =>
  this.getSoalFull(colId, soalId).then(item => {
    return Boolean(item.jawaban === jawaban);
  });
