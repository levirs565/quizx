import { jsonHandler, jsonHandlerSchema, actionHandler, actionHandlerSchema } from './helper';
import { PlayGameRequestBodySchema } from '../types/schema/game';
import { AnswerQuestionRequestBodySchema } from '../types/schema/quiz';
import * as GameService from '../services/game';

export const playGame = jsonHandlerSchema(PlayGameRequestBodySchema, async req => {
  const { soalId, interaktif } = req.body;

  return GameService.playGame(req.session, soalId, interaktif)
})

export const getGame = jsonHandler(async req => {
  return GameService.getGame(req.params.id)
})

export const getAllQuestion = jsonHandler(async req => {
  return GameService.getAllQuestion(req.session, req.params.gameId)
})

export const putAnswer = jsonHandlerSchema(AnswerQuestionRequestBodySchema, async req => {
  const { gameId, questionIndex: questionIndexStr } = req.params;
  const questionIndex = parseInt(questionIndexStr)
  const { jawaban } = req.body;

  return GameService.putAnswer(req.session, gameId, questionIndex, jawaban)
})

export const finishGame = actionHandler(async req => {
  return GameService.finishGame(req.session, req.params.id)
})
