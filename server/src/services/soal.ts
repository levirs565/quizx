import SoalModel, { QuizPackageDocument } from '../models/soal';
import { EError, E } from '../error';

export async function getPaketList() {
  const list = await SoalModel.find();

  return list.map(val => ({
    ...val.toShortDetail(),
    soalCount: val.soalList.length
  }));
}

export async function getPaketFull(id) {
  const quizPackage = await SoalModel.findById(id);

  if (!quizPackage) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

  return quizPackage;
}

export async function getPaket(id) {
  const quizPackage = await getPaketFull(id);

  return {
    ...quizPackage.toShortDetail(),
    soalList: quizPackage.soalList.map(
      (item, idx) => item.toShortDetail(idx)
    )
  };
}

export async function getSoalFull(colId, soalId) {
  const quizPackage = await getPaketFull(colId);
  const item = quizPackage.soalList[soalId];
  if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
  return item;
}

export async function getSoal(colId, soalId) {
  const item = await getSoalFull(colId, soalId);
  return {
    ...item.toShortDetail(soalId),
    paketID: colId,
    pilihan: item.pilihan
  };
}

export async function jawabSoal(colId, soalId, jawaban) {
  const item = await getSoalFull(colId, soalId)
  return Boolean(item.jawaban === jawaban);
}
