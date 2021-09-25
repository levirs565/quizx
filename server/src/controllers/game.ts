import { jsonHandler, jsonHandlerSchema, actionHandler, actionHandlerSchema } from './helper';
import { PlayGameRequestBody } from '../types/game';
import { AnswerQuestionRequestBody } from '../types/quiz';
import * as GameService from '../services/game';

export const playGame = jsonHandlerSchema(PlayGameRequestBody, async req => {
  const { quizId, isInteractive } = req.body;

  return GameService.playGame(req.session, quizId, isInteractive);
});

export const getGame = jsonHandler(async req => {
  return GameService.getGame(req.params.id);
});

export const getAllQuestion = jsonHandler(async req => {
  return GameService.getAllQuestion(req.session, req.params.gameId);
});

export const putAnswer = jsonHandlerSchema(AnswerQuestionRequestBody, async req => {
  const { gameId, questionId } = req.params;
  const { answer } = req.body;

  return GameService.putAnswer(req.session, gameId, questionId, answer);
});

export const finishGame = actionHandler(async req => {
  return GameService.finishGame(req.session, req.params.id);
});
