import GameModel from '../models/game';
import * as UserService from './user';
import * as QuizService from './quiz';
import { EError, E } from '../error';

export async function getUserGame(session) {
  const user = await UserService.validateUserLoggedIn(session);
  return {
    userID: user.id,
    permainan: await GameModel.findOne({ user: user.id }),
  };
}

async function validateGameStarted(session) {
  const { permainan } = await getUserGame(session);
  if (permainan) return permainan;
  throw new EError(...E.E401_PERMAINAN_NOT_STARTED);
}

export async function startGame(session, soalPaketID, interaktif) {
  const { userID, permainan: currentPermainan } = await getUserGame(session);
  if (currentPermainan) throw new EError(...E.E402_PERMAINAN_NOT_FINISHED);

  const paketSoal = await QuizService.getPackageDocument(soalPaketID);
  const permainan = {
    user: userID,
    soalPaketID,
    interaktif,
  };

  const { soalList } = paketSoal;
  const mdPermainan = new GameModel({
    ...permainan,
    soalList,
    jawabanList: [].fill(null, 0, soalList.length),
  });

  return mdPermainan.save();
}

export async function getQuiz(session, index) {
  const permainan = await validateGameStarted(session);
  const soal = permainan.soalList[index];

  if (!soal) throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);

  return {
    ...soal.toShortDetail(index),
    pilihan: soal.pilihan,
  };
}

export async function putAnswer(session, index, jawaban) {
  const currentPermainan = await validateGameStarted(session);
  const soalCount = currentPermainan.soalList.length;

  if (index < 0 || index >= soalCount) {
    throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);
  }

  currentPermainan.jawabanList.set(index, jawaban);

  await currentPermainan.save();

  if (currentPermainan.interaktif) {
    const benar = currentPermainan.soalList[index].jawaban === jawaban;
    return {
      benar,
    };
  }

  return {};
}

export async function stopGame(session) {
  const permainan = await validateGameStarted(session);
  const { soalList, jawabanList } = permainan;
  const result = {
    tidakDiJawab: 0,
    benar: 0,
    salah: 0,
  };

  soalList.forEach((soal, index) => {
    const actualJawaban = soal.jawaban;
    const userJawaban = jawabanList[index];

    if (userJawaban == null) result.tidakDiJawab += 1;
    else if (userJawaban === actualJawaban) result.benar += 1;
    else result.salah += 1;
  });

  return [result, await permainan.remove()];
}
