import QuizModel, { QuizDB } from '../models/quiz';
import { EError, E } from '../error';
import { AnswerQuestionResult, QuestionWAnswerWoId, QuestionWAnswer } from "../types/quiz"
import Session from '../types/session'
import { validateUserId } from './helper';

export async function getQuizList() {
  const list = await QuizModel.find();

  return list.map((val) => val.toSummary());
}

export async function getQuizDocument(id: string) {
  const quizPackage = await QuizModel.findById(id);

  if (!quizPackage) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

  return quizPackage;
}

export async function getQuiz(id: string) {
  const quizPackage = await getQuizDocument(id);

  return quizPackage.toQuiz();
}

export async function getQuestionDocument(quizId: string, questionId: string) {
  const quizPackage = await getQuizDocument(quizId);
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
  const paketDb = new QuizModel({
    userId: session.user!.id,
    title,
  } as QuizDB);

  await paketDb.save();
  return paketDb.toQuizWAnswer();
}

export async function getQuizForEditor(session: Session, id: string) {
  const doc = await getQuizDocument(id)
  await validateUserId(session, doc.userId);
  return doc.toQuizWAnswer()
}

export async function renameQuizTitle(session: Session, id: string, newTitle: string) {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);
  doc.title = newTitle;
  await doc.save();
}

export async function deleteQuiz(session: Session, id: string) {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);
  await doc.remove();
}

export async function addQuestion(session: Session, quizId: string, question: QuestionWAnswerWoId) {
  const doc = await getQuizDocument(quizId);
  await validateUserId(session, doc.userId);
  doc.questions.push({
    question: question.question,
    choices: question.choices,
    answer: question.answer,
  });

  await doc.save();
  const id = doc.questions.length - 1;

  return doc.questions[id].toQuestionWAnswer!()
}

export async function editQuestion(session: Session, quizId: string, questionId: string, soal: QuestionWAnswer) {
  const quizDocument = await getQuizDocument(quizId);
  await validateUserId(session, quizDocument.userId);
  const questionDocument = quizDocument.questions.id(questionId)

  if (!questionDocument) throw new EError(...E.E202_SOAL_NOT_FOUND);
  
  questionDocument.set(soal)
  
  await quizDocument.save()
}

export async function deleteQuestion(session: Session, quizId: string, questionId: string) {
  const quizDocument = await getQuizDocument(quizId);
  await validateUserId(session, quizDocument.userId);
  const questionDocument = quizDocument.questions.id(questionId)

  if (!questionDocument) throw new EError(...E.E202_SOAL_NOT_FOUND);

  await questionDocument.remove()
  await quizDocument.save()
}
