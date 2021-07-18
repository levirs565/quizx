import QuizModel from '../models/quiz';
import { EError, E } from '../error';
import { AnswerQuizResult } from "../types/quiz"
import * as UserService from './user';
import Session from '../types/session'

export async function getQuizList() {
  const list = await QuizModel.find();

  return list.map((val) => val.toSummary());
}

export async function getPackageDocument(id: number) {
  const quizPackage = await QuizModel.findById(id);

  if (!quizPackage) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

  return quizPackage;
}

export async function getQuiz(id: number) {
  const quizPackage = await getPackageDocument(id);

  return quizPackage.toQuiz();
}

export async function getQuestionDocument(quizId: number, questionId: number) {
  const quizPackage = await getPackageDocument(quizId);
  const item = quizPackage.soalList[questionId];
  if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
  return item;
}

export async function answerQuestion(quizId: number, questionId: number, answer: number): Promise<AnswerQuizResult> {
  const item = await getQuestionDocument(quizId, questionId);
  return {
    benar: item.jawaban == answer
  };
}

export async function createQuiz(session: Session, title: string) {
  await UserService.validateUserIsAdmin(session);
  const id = await QuizModel.estimatedDocumentCount();
  const paketDb = new QuizModel({
    _id: id,
    name: title,
  });

  await paketDb.save();
  return paketDb.toQuizWAnswer();
}

export async function getQuizForEditor(session: Session, id: number) {
  await UserService.validateUserIsAdmin(session);
  const doc = await getPackageDocument(id)
  return doc.toQuizWAnswer()
}

export async function renameQuizTitle(session: Session, id: number, newTitle: string) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await getPackageDocument(id);
  paketDB.name = newTitle;
  await paketDB.save();
  return paketDB.toQuiz();
}

export async function deleteQuiz(session: Session, id: number) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await getPackageDocument(id);
  return await paketDB.remove();
}

export async function addQuestion(session: Session, paketID: number, soal) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await getPackageDocument(paketID);
  paketDB.soalList.push({
    soal: soal.soal,
    pilihan: soal.pilihan,
    jawaban: soal.jawaban,
  });

  await paketDB.save();
  const id = paketDB.soalList.length - 1;

  return paketDB.soalList[id].toQuestionWAnswer(id)
}

export async function editQuestion(session: Session, paketID: number, soalID: number, soal) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await getPackageDocument(paketID);
  if (soalID < 0 || soalID >= paketDB.soalList.length) throw new EError(...E.E202_SOAL_NOT_FOUND);

  paketDB.soalList.set(soalID, {
    soal: soal.soal,
    pilihan: soal.pilihan,
    jawaban: soal.jawaban,
  });

  await paketDB.save();
  return paketDB.soalList[soalID].toQuestionWAnswer(soalID)
}

export async function deleteQuestion(session: Session, paketID: number, soalID: number) {
  await UserService.validateUserIsAdmin(session);
  const paketDB = await getPackageDocument(paketID);
  const soal = paketDB.soalList[soalID];

  if (!soal) throw new EError(...E.E202_SOAL_NOT_FOUND);

  paketDB.soalList.remove(soal);
  return await paketDB.save();
}
