import GameModel, { GameDB } from '../models/game';
import * as QuizService from './quiz';
import Session from '../types/session';
import { EError, E } from '../error';
import { Game, GameResult } from '../types/game';
import { AnswerQuestionResult, QuestionOptionalAnswer } from '../types/quiz';
import {
  validateUserLoggedIn,
  validateUserId,
  validateQuestionAnswerDataType,
  checkQuestionAnswer
} from './helper';
import { GameDBMapper, QuestionWAnswerMapper } from '../types/mapper';

export async function playGame(
  session: Session,
  quizId: string,
  isInteractive: boolean
): Promise<Game> {
  const user = await validateUserLoggedIn(session);
  const playedGame = await GameModel.findOne({ userId: user.id, isPlaying: true });
  if (playedGame) throw new EError(...E.E402_PERMAINAN_NOT_FINISHED);

  const quiz = await (await QuizService.getQuizDocument(quizId)).toPlain();

  const correctAnswers = quiz.questions.map(question => question.answer);
  const questions: QuestionOptionalAnswer[] = quiz.questions.map(QuestionWAnswerMapper.toQuestion);

  const game = new GameModel({
    userId: user.id,
    quizId,
    quizTitle: quiz.title,
    questions: questions,
    isInteractive,
    isPlaying: true,
    correctAnswers
  } as GameDB);

  await game.save();
  return GameDBMapper.toGame(game.toPlain());
}

async function getGameInternal(id: string) {
  const game = await GameModel.findOne({ _id: id });

  if (game) return game;

  throw new EError(...E.E404_GAME_NOT_FOUND);
}

export async function getGame(id: string): Promise<Game> {
  return GameDBMapper.toGame((await getGameInternal(id)).toPlain());
}

export async function getAllQuestion(
  session: Session,
  gameId: string
): Promise<QuestionOptionalAnswer[]> {
  const game = await getGameInternal(gameId);
  await validateUserId(session, game.userId);

  return game.toPlain().questions;
}

export async function putAnswer(
  session: Session,
  gameId: string,
  questionId: string,
  questionAnswer: number | string | null
): Promise<AnswerQuestionResult> {
  const game = await getGameInternal(gameId);
  await validateUserId(session, game.userId);

  const questionDocumentIndex = game.questions.findIndex(item => item.id == questionId);

  if (questionDocumentIndex == -1) {
    throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);
  }

  const questionDocument = game.questions[questionDocumentIndex];
  const correctAnswer = game.correctAnswers[questionDocumentIndex];

  validateQuestionAnswerDataType(correctAnswer, questionAnswer);
  questionDocument.answer = questionAnswer ?? undefined;

  await game.save();

  if (game.isInteractive) {
    return {
      correct: checkQuestionAnswer(questionDocument, correctAnswer, questionAnswer)
    };
  }

  return {};
}

export async function finishGame(session: Session, gameId: string) {
  const game = await getGameInternal(gameId);
  await validateUserId(session, game.userId);
  const { questions, correctAnswers } = game;
  const result: GameResult = {
    notAnswered: 0,
    correct: 0,
    wrong: 0
  };

  questions.forEach((question, index) => {
    const actualAnswer = correctAnswers[index];
    const userAnswer = question.answer;

    if (userAnswer === undefined) result.notAnswered += 1;
    else if (checkQuestionAnswer(question, actualAnswer, userAnswer)) result.correct += 1;
    else result.wrong += 1;
  });

  game.isPlaying = false;
  game.result = result;
  await game.save();
}
