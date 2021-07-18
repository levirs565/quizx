import GameModel, { Game } from '../models/game';
import * as QuizService from './quiz';
import Session from '../types/session';
import { EError, E } from '../error';
import { GameResult } from '../types/game';
import { AnswerQuizResult } from '../types/quiz'
import { validateUserLoggedIn } from './helper'

export async function getUserGame(session: Session) {
  const user = await validateUserLoggedIn(session);
  return await GameModel.findOne({ user: user.id });
}

async function validateGameStarted(session: Session) {
  const permainan = await getUserGame(session);
  if (permainan) return permainan;
  throw new EError(...E.E401_PERMAINAN_NOT_STARTED);
}

export async function startGame(session: Session, soalPaketID, interaktif) {
  const currentPermainan = await getUserGame(session);
  if (currentPermainan) throw new EError(...E.E402_PERMAINAN_NOT_FINISHED);

  const paketSoal = await QuizService.getPackageDocument(soalPaketID);

  const { soalList } = paketSoal;

  const mdPermainan = new GameModel({
    user: session.user.id,
    soalPaketID,
    soalList,
    interaktif,
    jawabanList: [].fill(null, 0, soalList.length),
  } as Game);

  return mdPermainan.save();
}

export async function getAllQuiz(session: Session) {
  const permainan = await validateGameStarted(session);

  return permainan.soalList.map((val, index) => val.toQuestion(index))
}

export async function getQuiz(session: Session, index) {
  const permainan = await validateGameStarted(session);
  const soal = permainan.soalList[index];

  if (!soal) throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);

  return soal.toQuestion(index);
}

export async function putAnswer(session: Session, index, jawaban): Promise<AnswerQuizResult> {
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
      benar
    };
  }

  return {};
}

export async function stopGame(session: Session) {
  const permainan = await validateGameStarted(session);
  const { soalList, jawabanList } = permainan;
  const result: GameResult = {
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

  await permainan.remove();
  return result;
}
