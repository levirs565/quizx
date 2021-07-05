import * as SoalService from './soal';
import * as UserService from './user';
import Soal from '../models/quiz_package';
import { EError, E } from '../error';

export async function getPaketList(session) {
  await UserService.validateUserIsAdmin(session);
  return SoalService.getPaketList();
}

export async function newPaket(session, paket) {
  await UserService.validateUserIsAdmin(session);
  const id = await Soal.estimatedDocumentCount();
  const paketDb = new Soal({
    _id: id,
    name: paket.name,
  });

  await paketDb.save();
  return paketDb.toShortDetail();
}

export async function getPaket(session, id) {
  await UserService.validateUserIsAdmin(session);
  return await SoalService.getPaket(id);
}

export async function editPaket(session, id, paket) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await SoalService.getPaketFull(id);
  paketDB.name = paket.name;
  await paketDB.save();
  return {
    ...paketDB.toShortDetail(),
    soalList: paketDB.soalList.map((item, idx) => item.toShortDetail(idx)),
  };
}

export async function removePaket(session, id) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await SoalService.getPaketFull(id);
  return await paketDB.remove();
}

export async function newSoal(session, paketID, soal) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await SoalService.getPaketFull(paketID);
  paketDB.soalList.push({
    soal: soal.soal,
    pilihan: soal.pilihan,
    jawaban: soal.jawaban,
  });

  await paketDB.save();
  const id = paketDB.soalList.length - 1;

  return {
    id,
    paketID,
    ...paketDB.soalList[id].toDetail(),
  };
}

export async function getSoal(session, paketID, soalID) {
  await UserService.validateUserIsAdmin(session);
  const soalDB = await SoalService.getSoalFull(paketID, soalID);
  return { id: soalID, paketID, ...soalDB.toDetail() };
}

export async function editSoal(session, paketID, soalID, soal) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await SoalService.getPaketFull(paketID);
  if (soalID < 0 || soalID >= paketDB.soalList.length) throw new EError(...E.E202_SOAL_NOT_FOUND);

  paketDB.soalList.set(soalID, {
    soal: soal.soal,
    pilihan: soal.pilihan,
    jawaban: soal.jawaban,
  });

  await paketDB.save();
  return { id: soalID, paketID, ...paketDB.soalList[soalID].toDetail() };
}

export async function removeSoal(session, paketID, soalID) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await SoalService.getPaketFull(paketID);
  const soal = paketDB.soalList[soalID];

  if (!soal) throw new EError(...E.E202_SOAL_NOT_FOUND);

  paketDB.soalList.remove(soal);
  return await paketDB.save();
}
