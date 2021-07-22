import QuizModel from '../models/quiz';
import { EError, E } from '../error';
import { AnswerQuizResult, QuestionWAnswerWoId, QuestionWAnswer } from "../types/quiz"
import Session from '../types/session'
import { validateUserIsAdmin } from './helper';

export async function getQuizList() {
  const list = await QuizModel.find();

  return list.map((val) => val.toSummary());
}

export async function getPackageDocument(id: string) {
  const quizPackage = await QuizModel.findById(id);

  if (!quizPackage) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

  return quizPackage;
}

export async function getQuiz(id: string) {
  const quizPackage = await getPackageDocument(id);

  return quizPackage.toQuiz();
}

export async function getQuestionDocument(quizId: string, questionId: string) {
  const quizPackage = await getPackageDocument(quizId);
  const item = quizPackage.soalList.id(questionId)
  if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
  return item;
}

export async function answerQuestion(quizId: string, questionId: string, answer: number): Promise<AnswerQuizResult> {
  const item = await getQuestionDocument(quizId, questionId);
  return {
    benar: item.jawaban == answer
  };
}

export async function createQuiz(session: Session, title: string) {
  await validateUserIsAdmin(session);
  const paketDb = new QuizModel({
    name: title,
  });

  await paketDb.save();
  return paketDb.toQuizWAnswer();
}

export async function getQuizForEditor(session: Session, id: string) {
  await validateUserIsAdmin(session);
  const doc = await getPackageDocument(id)
  return doc.toQuizWAnswer()
}

export async function renameQuizTitle(session: Session, id: string, newTitle: string) {
  await validateUserIsAdmin(session);
  const paketDB = await getPackageDocument(id);
  paketDB.name = newTitle;
  await paketDB.save();
}

export async function deleteQuiz(session: Session, id: string) {
  await validateUserIsAdmin(session);
  const paketDB = await getPackageDocument(id);
  await paketDB.remove();
}

export async function addQuestion(session: Session, quizId: string, question: QuestionWAnswerWoId) {
  await validateUserIsAdmin(session);
  const paketDB = await getPackageDocument(quizId);
  paketDB.soalList.push({
    soal: question.soal,
    pilihan: question.pilihan,
    jawaban: question.jawaban,
  });

  await paketDB.save();
  const id = paketDB.soalList.length - 1;

  return paketDB.soalList[id].toQuestionWAnswer!()
}

export async function editQuestion(session: Session, quizId: string, questionId: string, soal: QuestionWAnswer) {
  await validateUserIsAdmin(session);
  const quizDocument = await getPackageDocument(quizId);
  const questionDocument = quizDocument.soalList.id(questionId)

  if (!questionDocument) throw new EError(...E.E202_SOAL_NOT_FOUND);
  
  questionDocument.set(soal)
  
  await quizDocument.save()
}

export async function deleteQuestion(session: Session, quizId: string, questionId: string) {
  await validateUserIsAdmin(session);
  const quizDocument = await getPackageDocument(quizId);
  const questionDocument = quizDocument.soalList.id(questionId)

  if (!questionDocument) throw new EError(...E.E202_SOAL_NOT_FOUND);

  await questionDocument.remove()
  await quizDocument.save()
}
