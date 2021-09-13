import { Types } from "mongoose"
import QuizModel, { QuizDB } from '../models/quiz';
import { EError, E } from '../error';
import { AnswerQuestionResult, QuizWAnswer, SaveQuizResult } from '../types/quiz';
import Session from '../types/session';
import { validateUserId } from './helper';

export async function getQuizList() {
  const list = await QuizModel.find();

  return list.map(val => val.toSummary());
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
  const item = quizPackage.questions.id(questionId);
  if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
  return item;
}

export async function answerQuestion(
  quizId: string,
  questionId: string,
  answer: number
): Promise<AnswerQuestionResult> {
  const item = await getQuestionDocument(quizId, questionId);
  return {
    correct: item.answer == answer
  };
}

export async function createQuiz(session: Session, title: string) {
  const paketDb = new QuizModel({
    userId: session.user!.id,
    title
  } as QuizDB);

  await paketDb.save();
  return paketDb.toQuizWAnswer();
}

export async function getQuizForEditor(session: Session, id: string) {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);
  return doc.toQuizWAnswer();
}

export async function deleteQuiz(session: Session, id: string) {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);
  await doc.remove();
}

export async function saveQuiz(session: Session, id: string, quiz: QuizWAnswer) {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);

  const result: SaveQuizResult = {
    newQuestionsId: {}
  };
  doc.title = quiz.title;
  doc.set(
    'questions',
    quiz.questions.map(question => {
      let id = question.id

      if (id.startsWith("new-")) {
        const oldId = id
        id = new Types.ObjectId().toHexString()
        result.newQuestionsId[oldId] = id
      }

      return {
        _id: id,
        ...question
      };
    })
  );

  await doc.save();
  return result
}
