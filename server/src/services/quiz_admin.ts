import * as QuizService from './quiz';
import * as UserService from './user';
import Soal from '../models/quiz_package';
import { EError, E } from '../error';

export async function getPackageShortDetailList(session) {
  await UserService.validateUserIsAdmin(session);
  return QuizService.getPackageShortDetailList();
}

export async function newPackage(session, paket) {
  await UserService.validateUserIsAdmin(session);
  const id = await Soal.estimatedDocumentCount();
  const paketDb = new Soal({
    _id: id,
    name: paket.name,
  });

  await paketDb.save();
  return paketDb.toShortDetail();
}

export async function getPackageShortDetail(session, id: number) {
  await UserService.validateUserIsAdmin(session);
  return await QuizService.getPackageShortDetail(id);
}

export async function editPackage(session, id: number, paket) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(id);
  paketDB.name = paket.name;
  await paketDB.save();
  return {
    ...paketDB.toShortDetail(),
    soalList: paketDB.soalList.map((item, idx) => item.toShortDetail(idx)),
  };
}

export async function removePackage(session, id: number) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(id);
  return await paketDB.remove();
}

export async function newQuiz(session, paketID: number, soal) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(paketID);
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

export async function getQuizDetail(session, paketID: number, soalID: number) {
  await UserService.validateUserIsAdmin(session);
  const soalDB = await QuizService.getQuizDocument(paketID, soalID);
  return { id: soalID, paketID, ...soalDB.toDetail() };
}

export async function editQuiz(session, paketID: number, soalID: number, soal) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(paketID);
  if (soalID < 0 || soalID >= paketDB.soalList.length) throw new EError(...E.E202_SOAL_NOT_FOUND);

  paketDB.soalList.set(soalID, {
    soal: soal.soal,
    pilihan: soal.pilihan,
    jawaban: soal.jawaban,
  });

  await paketDB.save();
  return { id: soalID, paketID, ...paketDB.soalList[soalID].toDetail() };
}

export async function removeQuiz(session, paketID: number, soalID: number) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(paketID);
  const soal = paketDB.soalList[soalID];

  if (!soal) throw new EError(...E.E202_SOAL_NOT_FOUND);

  paketDB.soalList.remove(soal);
  return await paketDB.save();
}
