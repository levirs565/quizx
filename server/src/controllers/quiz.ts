import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { jsonHandler, actionHandler, actionHandlerSchema, jsonHandlerSchema } from './helper';
import { AnswerQuestionRequestBody, CreateQuizRequestBody, QuizWAnswer } from '../types/quiz';
import * as QuizService from '../services/quiz';
import { EError } from '../error';

function quizIdFromRequest(req: Request) {
  return req.params.id;
}

function questionIdFromRequest(req: Request) {
  const { quizId, questionId } = req.params;
  return {
    quizId: quizId,
    questionId: questionId
  };
}

export const getQuizList = jsonHandler(async req => {
  return {
    list: await QuizService.getQuizList()
  };
});

export const getQuiz = jsonHandler(async req => {
  const id = req.params.id;

  return QuizService.getQuiz(id);
});

export const answerQuestion = jsonHandlerSchema(AnswerQuestionRequestBody, async req => {
  const { quizId, questionId } = questionIdFromRequest(req);
  const { answer } = req.body;

  return QuizService.answerQuestion(quizId, questionId, answer);
});

export const createQuiz = jsonHandlerSchema(CreateQuizRequestBody, async req => {
  return QuizService.createQuiz(req.session, req.body.title, req.body.questions);
});

export const getQuizForEditor = jsonHandler(async req => {
  const id = quizIdFromRequest(req);

  return QuizService.getQuizForEditor(req.session, id);
});

export const saveQuiz = jsonHandlerSchema(QuizWAnswer, async req => {
  const id = quizIdFromRequest(req);
  return QuizService.saveQuiz(req.session, id, req.body);
});

export const deleteQuiz = actionHandler(async req => {
  const id = quizIdFromRequest(req);

  return QuizService.deleteQuiz(req.session, id);
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const id = quizIdFromRequest(req);
    cb(null, QuizService.getUploadDirectory(id));
  },
  filename(req, file, cb) {
    cb(null, QuizService.getUploadFilename(file.originalname));
  }
});

const uploader = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    cb(null, QuizService.canUploadByMime(file.mimetype));
  }
});

export function validateUserCanUpload(req: Request, res: Response, next: NextFunction) {
  QuizService.validateUserCanUpload(req.session, quizIdFromRequest(req))
    .then(() => next())
    .catch(next);
}
export const handleUploadFile = uploader.single('file');
export const getUploadResult = jsonHandler(async req =>
  QuizService.getUploadResult(req.file?.filename)
);
export function getFile(req: Request, res: Response) {
  const quizId = quizIdFromRequest(req);
  const name = req.params.name;
  const fileName = QuizService.getFilePath(quizId, name);
  if (fileName) res.sendFile(fileName);
  else res.sendStatus(404);
}
