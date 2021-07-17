import * as QuizService from './quiz';
import * as UserService from './user';
import QuizModel from '../models/quiz';
import Session from '../types/session'
import { EError, E } from '../error';

export async function getPackageShortDetailList(session: Session) {
  await UserService.validateUserIsAdmin(session);
  return QuizService.getPackageShortDetailList();
}

export async function newPackage(session: Session, paket) {
  await UserService.validateUserIsAdmin(session);
  const id = await QuizModel.estimatedDocumentCount();
  const paketDb = new QuizModel({
    _id: id,
    name: paket.name,
  });

  await paketDb.save();
  return paketDb.toQuizWAnswer();
}

export async function getPackage(session: Session, id: number) {
  await UserService.validateUserIsAdmin(session);
  const doc = await QuizService.getPackageDocument(id)
  return doc.toQuizWAnswer()
}

export async function editPackage(session: Session, id: number, paket) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(id);
  paketDB.name = paket.name;
  await paketDB.save();
  return paketDB.toQuiz();
}

export async function removePackage(session: Session, id: number) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(id);
  return await paketDB.remove();
}

export async function newQuiz(session: Session, paketID: number, soal) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(paketID);
  paketDB.soalList.push({
    soal: soal.soal,
    pilihan: soal.pilihan,
    jawaban: soal.jawaban,
  });

  await paketDB.save();
  const id = paketDB.soalList.length - 1;

  return paketDB.soalList[id].toQuestionWAnswer(id)
}

export async function getQuizDetail(session: Session, paketID: number, soalID: number) {
  await UserService.validateUserIsAdmin(session);
  const soalDB = await QuizService.getQuizDocument(paketID, soalID);
  return soalDB.toQuestionWAnswer(soalID)
}

export async function editQuiz(session: Session, paketID: number, soalID: number, soal) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(paketID);
  if (soalID < 0 || soalID >= paketDB.soalList.length) throw new EError(...E.E202_SOAL_NOT_FOUND);

  paketDB.soalList.set(soalID, {
    soal: soal.soal,
    pilihan: soal.pilihan,
    jawaban: soal.jawaban,
  });

  await paketDB.save();
  return paketDB.soalList[soalID].toQuestionWAnswer(soalID)
}

export async function removeQuiz(session: Session, paketID: number, soalID: number) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await QuizService.getPackageDocument(paketID);
  const soal = paketDB.soalList[soalID];

  if (!soal) throw new EError(...E.E202_SOAL_NOT_FOUND);

  paketDB.soalList.remove(soal);
  return await paketDB.save();
}
