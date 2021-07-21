import GameModel, { GameDB } from '../models/game';
import * as QuizService from './quiz';
import Session from '../types/session';
import { EError, E } from '../error';
import { GameResult } from '../types/game';
import { AnswerQuizResult, QuestionWAnswerWoId } from '../types/quiz';
import { validateUserLoggedIn, validateUserId } from './helper';

export async function playGame(session: Session, quizId: number, isInteractive: boolean) {
  const user = await validateUserLoggedIn(session)
  const playedGame = await GameModel.findOne({ userId: user.id, isPlaying: true })
  if (playedGame) throw new EError(...E.E402_PERMAINAN_NOT_FINISHED);

  const quiz = await QuizService.getPackageDocument(quizId);

  const correctAnswers = quiz.soalList.map((question) => question.jawaban);
  const questions: QuestionWAnswerWoId[] = quiz.soalList.map((question, index) => ({
    ...question.toQuestionWAnswer!(index),
    jawaban: -1,
  }));

  const game = new GameModel({
    userId: user.id,
    quizId,
    quizTitle: quiz.name,
    questions: questions,
    isInteractive,
    isPlaying: true,
    correctAnswers,
  } as GameDB);

  await game.save();
  return game.toGame()
}

async function getGameInternal(id: string) {
  const game = await GameModel.findOne({ _id: id });

  if (game)
    return game

  throw new EError(...E.E404_GAME_NOT_FOUND)
}

export async function getGame(id: string) {
  return (await getGameInternal(id)).toGame()
}

export async function getAllQuestion(session: Session, gameId: string) {
  const game = await getGameInternal(gameId);
  await validateUserId(session, game.userId)

  return game.questions.map((val, index) => val.toQuestionWAnswer!(index));
}

export async function putAnswer(
  session: Session,
  gameId: string,
  questionIndex: number,
  questionAnswer: number
): Promise<AnswerQuizResult> {
  const game = await getGameInternal(gameId);
  await validateUserId(session, game.userId)

  if (questionIndex < 0 || questionIndex >= game.questions.length) {
    throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);
  }

  game.questions[questionIndex].jawaban = questionAnswer

  await game.save();

  if (game.isInteractive) {
    const benar = game.correctAnswers[questionIndex] === questionAnswer;
    return {
      benar,
    };
  }

  return {};
}

export async function finishGame(session: Session, gameId: string) {
  const game = await getGameInternal(gameId)
  await validateUserId(session, game.userId)
  const { questions, correctAnswers } = game;
  const result: GameResult = {
    tidakDiJawab: 0,
    benar: 0,
    salah: 0,
  };

  questions.forEach((soal, index) => {
    const actualAnswer = correctAnswers[index]
    const userAnswer = soal.jawaban

    if (userAnswer == -1) result.tidakDiJawab += 1;
    else if (userAnswer === actualAnswer) result.benar += 1;
    else result.salah += 1;
  });

  game.isPlaying = false
  game.result = result
  await game.save()
}
