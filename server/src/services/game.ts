import GameModel from '../models/game';
import * as QuizService from './quiz';
import Session from '../types/session';
import { EError, E } from '../error';
import { GameSummary, GamePreference, GameResult, Game, QuestionState } from '../types/game';
import { AnswerQuestionResult, QuestionOptionalAnswer } from '../types/quiz';
import {
  validateUserLoggedIn,
  validateUserId,
  validateQuestionAnswerDataType,
  checkQuestionAnswer
} from './helper';
import { GameMapper, QuestionWAnswerMapper } from '../types/mapper';
import shuffle from 'just-shuffle';

export async function playGame(
  session: Session,
  quizId: string,
  preference: GamePreference
): Promise<GameSummary> {
  const user = await validateUserLoggedIn(session);
  const playedGame = await GameModel.findOne({ userId: user.id, isPlaying: true });
  if (playedGame) throw new EError(...E.E402_PERMAINAN_NOT_FINISHED);

  const quiz = await (await QuizService.getQuizDocument(quizId)).toPlain();

  let sourceQuestions = quiz.questions;
  if (preference.shuffleQuestions) sourceQuestions = shuffle(sourceQuestions);
  const correctAnswers = sourceQuestions.map(question => question.answer);
  const questions: QuestionOptionalAnswer[] = sourceQuestions.map(QuestionWAnswerMapper.toQuestion);

  const game = new GameModel({
    userId: user.id,
    quizId,
    quizTitle: quiz.title,
    questions: questions,
    isPlaying: true,
    correctAnswers,
    ...preference
  } as Game);

  await game.save();
  return GameMapper.toGameSummary(game.toPlain());
}

async function getGameInternal(id: string) {
  const game = await GameModel.findOne({ _id: id });

  if (game) return game;

  throw new EError(...E.E404_GAME_NOT_FOUND);
}

export async function getGame(id: string): Promise<GameSummary> {
  const game = (await getGameInternal(id)).toPlain();
  if (game.isPlaying) game.correctAnswers = undefined;

  return game;
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
  const correctAnswer = game.correctAnswers![questionDocumentIndex];

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
    unanswered: 0,
    correct: 0,
    wrong: 0,
    questionsState: []
  };

  questions.forEach((question, index) => {
    const actualAnswer = correctAnswers![index];
    const userAnswer = question.answer;
    let state: QuestionState;

    if (userAnswer === undefined) {
      result.unanswered += 1;
      state = QuestionState.Unanswered;
    } else if (checkQuestionAnswer(question, actualAnswer, userAnswer)) {
      result.correct += 1;
      state = QuestionState.Correct
    } else {
      result.wrong += 1;
      state = QuestionState.Incorrect
    }
    result.questionsState.push(state);
  });

  game.isPlaying = false;
  game.result = result;
  await game.save();
}
