import GameModel, { GameDB } from '../models/game';
import * as QuizService from './quiz';
import Session from '../types/session';
import { EError, E } from '../error';
import { GameResult } from '../types/game';
import { AnswerQuestionResult, QuestionWAnswerWoId } from '../types/quiz';
import { validateUserLoggedIn, validateUserId } from './helper';

export async function playGame(session: Session, quizId: string, isInteractive: boolean) {
  const user = await validateUserLoggedIn(session)
  const playedGame = await GameModel.findOne({ userId: user.id, isPlaying: true })
  if (playedGame) throw new EError(...E.E402_PERMAINAN_NOT_FINISHED);

  const quiz = await QuizService.getQuizDocument(quizId);

  const correctAnswers = quiz.questions.map((question) => question.answer);
  const questions: QuestionWAnswerWoId[] = quiz.questions.map((question) => ({
    ...question.toQuestionWAnswer!(),
    jawaban: -1,
  }));

  const game = new GameModel({
    userId: user.id,
    quizId,
    quizTitle: quiz.title,
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

  return game.questions.map((val, index) => val.toQuestionWAnswer!());
}

export async function putAnswer(
  session: Session,
  gameId: string,
  questionId: string,
  questionAnswer: number
): Promise<AnswerQuestionResult> {
  const game = await getGameInternal(gameId);
  await validateUserId(session, game.userId)

  const questionDocument = game.questions.id(questionId)
  if (!questionDocument) {
    throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);
  }

  questionDocument.answer = questionAnswer

  await game.save();

  if (game.isInteractive) {
    const index = game.questions.indexOf(questionDocument)
    const correct = game.correctAnswers[index] === questionAnswer;
    return {
      correct,
    };
  }

  return {};
}

export async function finishGame(session: Session, gameId: string) {
  const game = await getGameInternal(gameId)
  await validateUserId(session, game.userId)
  const { questions, correctAnswers } = game;
  const result: GameResult = {
    notAnswered: 0,
    correct: 0,
    wrong: 0,
  };

  questions.forEach((soal, index) => {
    const actualAnswer = correctAnswers[index]
    const userAnswer = soal.answer

    if (userAnswer == -1) result.notAnswered += 1;
    else if (userAnswer === actualAnswer) result.correct += 1;
    else result.wrong += 1;
  });

  game.isPlaying = false
  game.result = result
  await game.save()
}
