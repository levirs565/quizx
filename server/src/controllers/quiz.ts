import { Request, Response, NextFunction } from 'express';
import { jsonHandler, actionHandler } from './helper';
import * as QuizService from '../services/quiz';

function quizIdFromRequest(req: Request) {
  return parseInt(req.params.id)
}

function questionIdFromRequest(req: Request) {
  const { quizId, questionId } = req.params;
  return {
    quizId: parseInt(quizId),
    questionId: parseInt(questionId)
  }
}

export const getQuizList = jsonHandler(async req => {
  return {
    list: await QuizService.getQuizList()
  }
})

export const getQuiz = jsonHandler(async req => {
  const id = parseInt(req.params.id);

  return QuizService.getQuiz(id)
})

export const answerQuestion = jsonHandler(async req => {
  const { quizId, questionId } = questionIdFromRequest(req)
  const { jawaban } = req.body;

  return QuizService.answerQuestion(quizId, questionId, jawaban)
})

export const createQuiz = jsonHandler(async req => {
  return QuizService.createQuiz(req.session, req.body.name)
})

export const getQuizForEditor = jsonHandler(async req => {
  const id = quizIdFromRequest(req)

  return QuizService.getQuizForEditor(req.session, id)
})

export const renameQuizTitle = actionHandler(async req => {
  const id = quizIdFromRequest(req)

  return QuizService.renameQuizTitle(req.session, id, req.body.name)
})

export const deleteQuiz = actionHandler(async req => {
  const id = quizIdFromRequest(req)

  return QuizService.deleteQuiz(req.session, id)
})

export const addQuestion = jsonHandler(async req => {
  const { quizId } = questionIdFromRequest(req);

  return QuizService.addQuestion(req.session, quizId, req.body)
})

export const editQuestion = actionHandler(async req => {
  const { quizId, questionId } = questionIdFromRequest(req);

  return QuizService.editQuestion(req.session, quizId, questionId, req.body)
})

export const deleteQuestion = actionHandler(async req => {
  const { quizId, questionId } = questionIdFromRequest(req);

  return QuizService.deleteQuestion(req.session, quizId, questionId)
})
