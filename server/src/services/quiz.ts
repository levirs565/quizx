import QuizModel from '../models/quiz';
import { EError, E } from '../error';
import { AnswerQuizResult } from "../types/quiz"

export async function getPackageShortDetailList() {
  const list = await QuizModel.find();

  return list.map((val) => val.toSummary());
}

export async function getPackageDocument(id: number) {
  const quizPackage = await QuizModel.findById(id);

  if (!quizPackage) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

  return quizPackage;
}

export async function getPackageShortDetail(id: number) {
  const quizPackage = await getPackageDocument(id);

  return quizPackage.toQuiz();
}

export async function getQuizDocument(colId: number, soalId: number) {
  const quizPackage = await getPackageDocument(colId);
  const item = quizPackage.soalList[soalId];
  if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
  return item;
}

export async function getQuizShortDetail(colId: number, soalId: number) {
  const item = await getQuizDocument(colId, soalId);
  return item.toQuestionWAnswer(soalId);
}

export async function answerQuiz(colId: number, soalId: number, answer: number): Promise<AnswerQuizResult> {
  const item = await getQuizDocument(colId, soalId);
  return {
    benar: item.jawaban == answer
  };
}
