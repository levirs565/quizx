import { Request, Response, NextFunction } from 'express';
import { jsonHandler, jsonHandlerSchema, actionHandler, actionHandlerSchema } from './helper';
import {
  QuestionWAnswerWoIdSchema,
  QuestionWAnswerSchema,
  AnswerQuestionRequestBodySchema,
  CreateRenameQuizRequestBodySchema
} from '../types/schema/quiz';
import * as QuizService from '../services/quiz';

function quizIdFromRequest(req: Request) {
  return req.params.id;
}

function questionIdFromRequest(req: Request) {
  const { quizId, questionId } = req.params;
  return {
    quizId: quizId,
    questionId: questionId,
  };
}

export const getQuizList = jsonHandler(async (req) => {
  return {
    list: await QuizService.getQuizList(),
  };
});

export const getQuiz = jsonHandler(async (req) => {
  const id = req.params.id;

  return QuizService.getQuiz(id);
});

export const answerQuestion = jsonHandlerSchema(AnswerQuestionRequestBodySchema, async (req) => {
  const { quizId, questionId } = questionIdFromRequest(req);
  const { jawaban } = req.body;

  return QuizService.answerQuestion(quizId, questionId, jawaban);
});

export const createQuiz = jsonHandlerSchema(CreateRenameQuizRequestBodySchema, async (req) => {
  return QuizService.createQuiz(req.session, req.body.name);
});

export const getQuizForEditor = jsonHandler(async (req) => {
  const id = quizIdFromRequest(req);

  return QuizService.getQuizForEditor(req.session, id);
});

export const renameQuizTitle = actionHandlerSchema(CreateRenameQuizRequestBodySchema, async (req) => {
  const id = quizIdFromRequest(req);

  return QuizService.renameQuizTitle(req.session, id, req.body.name);
});

export const deleteQuiz = actionHandler(async (req) => {
  const id = quizIdFromRequest(req);

  return QuizService.deleteQuiz(req.session, id);
});

export const addQuestion = jsonHandlerSchema(QuestionWAnswerWoIdSchema, async (req) => {
  const { quizId } = questionIdFromRequest(req);

  return QuizService.addQuestion(req.session, quizId, req.body);
});

export const editQuestion = actionHandlerSchema(QuestionWAnswerSchema, async (req) => {
  const { quizId, questionId } = questionIdFromRequest(req);

  return QuizService.editQuestion(req.session, quizId, questionId, req.body);
});

export const deleteQuestion = actionHandler(async (req) => {
  const { quizId, questionId } = questionIdFromRequest(req);

  return QuizService.deleteQuestion(req.session, quizId, questionId);
});
