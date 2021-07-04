import Permainan from '../models/permainan';
import * as UserService from './user';
import * as SoalService from './soal';
import { EError, E } from '../error';

export async function getUserPermainan(session) {
  const user = await UserService.validateUserLoggedIn(session);
  return {
    userID: user.id,
    permainan: await Permainan.findOne({ user: user.id }),
  };
}

async function validatePermainanStarted(session) {
  const { permainan } = await getUserPermainan(session);
  if (permainan) return permainan;
  throw new EError(...E.E401_PERMAINAN_NOT_STARTED);
}

export async function startPermainan(session, soalPaketID, interaktif) {
  const { userID, permainan: currentPermainan } = await getUserPermainan(session);
  if (currentPermainan) throw new EError(...E.E402_PERMAINAN_NOT_FINISHED);

  const paketSoal = await SoalService.getPaketFull(soalPaketID);
  const permainan = {
    user: userID,
    soalPaketID,
    interaktif,
  };

  const { soalList } = paketSoal;
  const mdPermainan = new Permainan({
    ...permainan,
    soalList,
    jawabanList: [].fill(null, 0, soalList.length),
  });

  return mdPermainan.save();
}

export async function getSoal(session, index) {
  const permainan = await validatePermainanStarted(session);
  const soal = permainan.soalList[index];

  if (!soal) throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);

  return {
    ...soal.toShortDetail(index),
    pilihan: soal.pilihan,
  };
}

export async function putJawaban(session, index, jawaban) {
  const currentPermainan = await validatePermainanStarted(session);
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

export async function stopPermainan(session) {
  const permainan = await validatePermainanStarted(session);
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
