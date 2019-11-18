const SoalModel = require('../models/soal');
const { EError, E } = require('../error');

exports.getPaketList = () =>
  SoalModel.find().then(list =>
    list.map(val => ({ ...val.toShortDetail(), soalCount: val.soalList.length }))
  );

exports.getPaketFull = id =>
  SoalModel.findById(id).then(val => {
    if (!val) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

    return val;
  });

exports.getPaket = id =>
  this.getPaketFull(id).then(val => {
    return {
      ...val.toShortDetail(),
      soalList: val.soalList.map((item, idx) => item.toShortDetail(idx))
    };
  });

exports.getSoalFull = (colId, soalId) =>
  this.getPaketFull(colId)
    .then(paket => paket.soalList[soalId])
    .then(item => {
      if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
      return item;
    });

exports.getSoal = (colId, soalId) =>
  this.getSoalFull(colId, soalId).then(item => {
    return {
      ...item.toShortDetail(soalId),
      paketID: colId,
      pilihan: item.pilihan
    };
  });

exports.jawabSoal = (colId, soalId, jawaban) =>
  this.getSoalFull(colId, soalId).then(item => {
    return Boolean(item.jawaban === jawaban);
  });
