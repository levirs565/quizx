import { Request, Response, NextFunction } from 'express';

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

export function getQuizList(_req: Request, res: Response, next: NextFunction) {
  return QuizService.getQuizList()
    .then((list) => res.json({ list }))
    .catch(next);
}

export function getQuiz(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);

  QuizService.getQuiz(id)
    .then((val) => {
      res.json({
        ...val,
      });
    })
    .catch(next);
}

export function answerQuestion(req: Request, res: Response, next: NextFunction) {
  const { quizId, questionId } = questionIdFromRequest(req)
  const { jawaban } = req.body;

  QuizService.answerQuestion(quizId, questionId, jawaban)
    .then((val) => {
      res.json(val);
    })
    .catch(next);
}


export function createQuiz(req: Request, res: Response, next: NextFunction) {
  return QuizService.createQuiz(req.session, req.body.name)
    .then((val) => res.json(val))
    .catch(next);
}

export function getQuizForEditor(req: Request, res: Response, next: NextFunction) {
  const id = quizIdFromRequest(req)

  QuizService.getQuizForEditor(req.session, id)
    .then((val) => res.json(val))
    .catch(next);
}

export function renameQuizTitle(req: Request, res: Response, next: NextFunction) {
  const id = quizIdFromRequest(req)

  QuizService.renameQuizTitle(req.session, id, req.body.name)
    .then((val) => res.json(val))
    .catch(next);
}

export function deleteQuiz(req: Request, res: Response, next: NextFunction) {
  const id = quizIdFromRequest(req)

  QuizService.deleteQuiz(req.session, id)
    .then(() => res.json({ msg: 'paket is removed' }))
    .catch(next);
}

export function addQuestion(req: Request, res: Response, next: NextFunction) {
  const { quizId } = questionIdFromRequest(req);

  QuizService.addQuestion(req.session, quizId, req.body)
    .then((val) => res.json(val))
    .catch(next);
}

export function editQuestion(req: Request, res: Response, next: NextFunction) {
  const { quizId, questionId } = questionIdFromRequest(req);

  QuizService.editQuestion(req.session, quizId, questionId, req.body)
    .then((val) => res.json(val))
    .catch(next);
}

export function deleteQuestion(req: Request, res: Response, next: NextFunction) {
  const { quizId, questionId } = questionIdFromRequest(req);

  QuizService.deleteQuestion(req.session, quizId, questionId)
    .then((val) => res.json({ msg: 'soal is removed' }))
    .catch(next);
}
