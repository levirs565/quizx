const SoalService = require('./soal');
const UserService = require('./user');
const Soal = require('../models/soal');
const { EError, E } = require('../error');

exports.getPaketList = session =>
  UserService.validateUserIsAdmin(session).then(() => SoalService.getPaketList());

exports.newPaket = (session, paket) =>
  UserService.validateUserIsAdmin(session)
    .then(() => Soal.estimatedDocumentCount())
    .then(id => {
      const paketDb = new Soal({
        _id: id,
        name: paket.name
      });

      return paketDb.save();
    })
    .then(val => val.toShortDetail());

exports.getPaket = (session, id) =>
  UserService.validateUserIsAdmin(session).then(() => SoalService.getPaket(id));

exports.editPaket = (session, id, paket) =>
  UserService.validateUserIsAdmin(session)
    .then(() => SoalService.getPaketFull(id))
    .then(paketDB => {
      // eslint-disable-next-line no-param-reassign
      paketDB.name = paket.name;
      return paketDB.save();
    })
    .then(val => ({
      ...val.toShortDetail(),
      soalList: val.soalList.map((item, idx) => item.toShortDetail(idx))
    }));

exports.removePaket = (session, id) =>
  UserService.validateUserIsAdmin(session)
    .then(() => SoalService.getPaketFull(id))
    .then(paketDB => {
      return paketDB.remove();
    });

exports.newSoal = (session, paketID, soal) =>
  UserService.validateUserIsAdmin(session)
    .then(() => SoalService.getPaketFull(paketID))
    .then(paketDB => {
      paketDB.soalList.push({
        soal: soal.soal,
        pilihan: soal.pilihan,
        jawaban: soal.jawaban
      });

      return paketDB.save();
    })
    .then(paketDB => {
      const id = paketDB.soalList.length - 1;

      return {
        id,
        paketID,
        ...paketDB.soalList[id].toDetail()
      };
    });

exports.getSoal = (session, paketID, soalID) =>
  UserService.validateUserIsAdmin(session)
    .then(() => SoalService.getSoalFull(paketID, soalID))
    .then(val => ({ id: soalID, paketID, ...val.toDetail() }));

exports.editSoal = (session, paketID, soalID, soal) =>
  UserService.validateUserIsAdmin(session)
    .then(() => SoalService.getPaketFull(paketID))
    .then(paketDB => {
      if (soalID < 0 || soalID >= paketDB.soalList.length)
        throw new EError(...E.E202_SOAL_NOT_FOUND);

      paketDB.soalList.set(soalID, {
        soal: soal.soal,
        pilihan: soal.pilihan,
        jawaban: soal.jawaban
      });

      return paketDB.save();
    })
    .then(val => ({ id: soalID, paketID, ...val.soalList[soalID].toDetail() }));

exports.removeSoal = (session, paketID, soalID) =>
  UserService.validateUserIsAdmin(session)
    .then(() => SoalService.getPaketFull(paketID))
    .then(paketDB => {
      const soal = paketDB.soalList[soalID];

      if (!soal) throw new EError(...E.E202_SOAL_NOT_FOUND);

      paketDB.soalList.remove(soal);
      return paketDB.save();
    });
