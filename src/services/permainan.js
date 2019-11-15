const Permainan = require('../models/permainan');
const UserService = require('./user');
const SoalService = require('./soal');
const { ClientError } = require('../utils/error');

const getUserPermainan = session =>
  UserService.validateUserLoggedIn(session).then(user => {
    return Promise.all([Promise.resolve(user), Permainan.findOne({ user })]);
  });

const validatePermainanStarted = session =>
  getUserPermainan(session).then(([user, permainan]) => {
    if (permainan) return permainan;
    throw new ClientError('Permainan is not started');
  });

exports.startPermainan = (session, soalColId) =>
  getUserPermainan(session)
    .then(([user, permainan]) => {
      if (permainan) throw new ClientError('Your permainan is not finished');

      const soalCollectionPromise = SoalService.getCollectionFull(soalColId);
      const permainanPromise = Promise.resolve({
        user,
        soalColId
      });

      return Promise.all([permainanPromise, soalCollectionPromise]);
    })
    .then(([permainan, soalCollection]) => {
      const { soalList } = soalCollection;
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

    if (!soal) throw new ClientError('Soal not found');

    return {
      ...soal.toShortDetail(index),
      pilihan: soal.pilihan
    };
  });

exports.putJawaban = (session, index, jawaban) =>
  validatePermainanStarted(session).then(per => {
    const soalCount = per.soalList.length;

    if (index < 0 || index >= soalCount) throw new ClientError('Soal not found');

    const permainan = per;
    permainan.jawabanList.set(index, jawaban);

    return permainan.save();
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
