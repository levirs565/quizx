const Permainan = require('../models/permainan').default;
const UserService = require('./user');
const SoalService = require('./soal');
const { EError, E } = require('../error');

const getUserPermainan = session =>
  UserService.validateUserLoggedIn(session).then(user => {
    return Promise.all([Promise.resolve(user.id), Permainan.findOne({ user: user.id })]);
  });

const validatePermainanStarted = session =>
  getUserPermainan(session).then(([user, permainan]) => {
    if (permainan) return permainan;
    throw new EError(...E.E401_PERMAINAN_NOT_STARTED);
  });

exports.startPermainan = (session, soalPaketID, interaktif) =>
  getUserPermainan(session)
    .then(([user, permainan]) => {
      if (permainan) throw new EError(...E.E402_PERMAINAN_NOT_FINISHED);

      const soalPaketPromise = SoalService.getPaketFull(soalPaketID);
      const permainanPromise = Promise.resolve({
        user,
        soalPaketID,
        interaktif
      });

      return Promise.all([permainanPromise, soalPaketPromise]);
    })
    .then(([permainan, soalPaket]) => {
      const { soalList } = soalPaket;
      const mdPermainan = new Permainan({
        ...permainan,
        soalList,
        jawabanList: [].fill(null, 0, soalList.length)
      });

      return mdPermainan.save();
    });

exports.getSoal = (session, index) =>
  validatePermainanStarted(session).then(permainan => {
    const soal = permainan.soalList[index];

    if (!soal) throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);

    return {
      ...soal.toShortDetail(index),
      pilihan: soal.pilihan
    };
  });

exports.putJawaban = (session, index, jawaban) =>
  validatePermainanStarted(session)
    .then(per => {
      const soalCount = per.soalList.length;

      if (index < 0 || index >= soalCount) {
        throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);
      }

      const permainan = per;
      permainan.jawabanList.set(index, jawaban);

      return permainan.save();
    })
    .then(permainan => {
      const result = {};
      if (permainan.interaktif) {
        const benar = permainan.soalList[index].jawaban === jawaban;
        result.benar = benar;
      }

      return result;
    });

exports.stopPermainan = session =>
  validatePermainanStarted(session).then(permainan => {
    const { soalList, jawabanList } = permainan;
    const result = {
      tidakDiJawab: 0,
      benar: 0,
      salah: 0
    };

    soalList.forEach((soal, index) => {
      const actualJawaban = soal.jawaban;
      const userJawaban = jawabanList[index];

      if (userJawaban == null) result.tidakDiJawab += 1;
      else if (userJawaban === actualJawaban) result.benar += 1;
      else result.salah += 1;
    });

    return Promise.all([Promise.resolve(result), permainan.remove()]);
  });

exports.getUserPermainan = getUserPermainan;
