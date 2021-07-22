import QuizModel from '../models/quiz';
import { EError, E } from '../error';
import { AnswerQuestionResult, QuestionWAnswerWoId, QuestionWAnswer } from "../types/quiz"
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
  const item = quizPackage.questions.id(questionId)
  if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
  return item;
}

export async function answerQuestion(quizId: string, questionId: string, answer: number): Promise<AnswerQuestionResult> {
  const item = await getQuestionDocument(quizId, questionId);
  return {
    correct: item.answer == answer
  };
}

export async function createQuiz(session: Session, title: string) {
  await validateUserIsAdmin(session);
  const paketDb = new QuizModel({
    title,
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
  paketDB.title = newTitle;
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
  paketDB.questions.push({
    question: question.question,
    choices: question.choices,
    answer: question.answer,
  });

  await paketDB.save();
  const id = paketDB.questions.length - 1;

  return paketDB.questions[id].toQuestionWAnswer!()
}

export async function editQuestion(session: Session, quizId: string, questionId: string, soal: QuestionWAnswer) {
  await validateUserIsAdmin(session);
  const quizDocument = await getPackageDocument(quizId);
  const questionDocument = quizDocument.questions.id(questionId)

  if (!questionDocument) throw new EError(...E.E202_SOAL_NOT_FOUND);
  
  questionDocument.set(soal)
  
  await quizDocument.save()
}

export async function deleteQuestion(session: Session, quizId: string, questionId: string) {
  await validateUserIsAdmin(session);
  const quizDocument = await getPackageDocument(quizId);
  const questionDocument = quizDocument.questions.id(questionId)

  if (!questionDocument) throw new EError(...E.E202_SOAL_NOT_FOUND);

  await questionDocument.remove()
  await quizDocument.save()
}
