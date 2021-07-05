import QuizModel, { QuizPackageDocument } from '../models/quiz_package';
import { EError, E } from '../error';

export async function getPackageShortDetailList() {
  const list = await QuizModel.find();

  return list.map(val => ({
    ...val.toShortDetail(),
    soalCount: val.soalList.length
  }));
}

export async function getPackageDocument(id: number) {
  const quizPackage = await QuizModel.findById(id);

  if (!quizPackage) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

  return quizPackage;
}

export async function getPackageShortDetail(id: number) {
  const quizPackage = await getPackageDocument(id);

  return {
    ...quizPackage.toShortDetail(),
    soalList: quizPackage.soalList.map(
      (item, idx) => item.toShortDetail(idx)
    )
  };
}

export async function getQuizDocument(colId: number, soalId: number) {
  const quizPackage = await getPackageDocument(colId);
  const item = quizPackage.soalList[soalId];
  if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
  return item;
}

export async function getQuizShortDetail(colId: number, soalId: number) {
  const item = await getQuizDocument(colId, soalId);
  return {
    ...item.toShortDetail(soalId),
    paketID: colId,
    pilihan: item.pilihan
  };
}

export async function answerQuiz(colId: number, soalId: number, answer: number) {
  const item = await getQuizDocument(colId, soalId)
  return Boolean(item.jawaban === answer);
}
