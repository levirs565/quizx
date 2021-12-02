import { Types } from 'mongoose';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs-extra';
import QuizModel from '../models/quiz';
import { EError, E } from '../error';
import {
  AnswerQuestionResult,
  CreateQuizResult,
  Quiz,
  QuizSummary,
  Question,
  SaveQuizResult,
  CreateQuizParameters
} from '../types/quiz';
import Session from '../types/session';
import {
  checkQuestionAnswer,
  validateQuestionAnswerDataType,
  validateUserId,
  validateUserLoggedIn
} from './helper';
import config from '../config';
import { mapper } from '../types/mapper';
import { classToPlain, instanceToPlain } from 'class-transformer';

export async function getQuizList(): Promise<QuizSummary[]> {
  const list = await QuizModel.find();

  return list.map(val => mapper.map(val.toClass(), QuizSummary, Quiz));
}

export async function getQuizDocument(id: string) {
  const quizPackage = await QuizModel.findById(id);

  if (!quizPackage) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

  return quizPackage;
}

export async function getQuiz(id: string): Promise<Quiz> {
  const quizPackage = await getQuizDocument(id);
  const quiz = quizPackage.toClass();

  quiz.questions.forEach(question => {
    question.answer = undefined;
  });

  return quiz;
}

export async function getQuestionDocument(quizId: string, questionId: string) {
  const quizPackage = await getQuizDocument(quizId);
  const item = quizPackage.questions.find(item => item.id == questionId);
  if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
  return item;
}

export async function answerQuestion(
  quizId: string,
  questionId: string,
  answer: number | string | null
): Promise<AnswerQuestionResult> {
  const item = await getQuestionDocument(quizId, questionId);
  validateQuestionAnswerDataType(item.answer!, answer);
  return {
    correct: checkQuestionAnswer(item, item.answer!, answer)
  };
}

export async function createQuiz(
  session: Session,
  param: CreateQuizParameters
): Promise<CreateQuizResult> {
  await validateUserLoggedIn(session);
  const paketDb = new QuizModel({
    userId: session.user!.id,
    ...instanceToPlain(param)
  });

  await paketDb.save();
  return {
    id: paketDb.id
  };
}

export async function getQuizForEditor(session: Session, id: string): Promise<Quiz> {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);
  return doc.toClass();
}

export async function deleteQuiz(session: Session, id: string) {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);
  await doc.remove();
}

export async function saveQuiz(session: Session, id: string, quiz: Quiz): Promise<SaveQuizResult> {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);

  const result: SaveQuizResult = {
    newQuestionsId: {}
  };
  quiz.questions.forEach(question => {
    const id = question.id!;
    if (id.startsWith('new-')) {
      question.id = new Types.ObjectId().toHexString();
      result.newQuestionsId[id] = question.id;
    }
  });
  const { questions } = instanceToPlain(quiz);

  doc.title = quiz.title;
  doc.set('questions', questions);

  await doc.save();
  return result;
}

export async function validateUserCanUpload(session: Session, id: string) {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);
}

const uploadRoot = path.join(config.storagePath, 'quiz');

export function getUploadDirectory(quizId: string) {
  const dir = path.join(uploadRoot, quizId);
  fs.ensureDirSync(dir);
  return dir;
}

export function getUploadFilename(originalName: string) {
  const extension = path.extname(originalName);
  return crypto.randomUUID() + extension;
}

export function getFilePath(quizId: string, name: string) {
  const filePath = path.join(uploadRoot, quizId, name);
  if (fs.existsSync(filePath)) return filePath;
  return undefined;
}

export function canUploadByMime(mime: string) {
  return mime.startsWith('image/');
}

export function getUploadResult(fileName?: string) {
  if (!fileName) throw new EError(200, 'File is not accepted');

  return {
    name: fileName
  };
}
