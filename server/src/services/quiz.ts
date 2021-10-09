import { Types } from 'mongoose';
import QuizModel from '../models/quiz';
import { EError, E } from '../error';
import {
  AnswerQuestionResult,
  CreateQuizResult,
  QuestionWAnswer,
  QuestionWAnswerWoId,
  Quiz,
  QuizSummary,
  QuizWAnswer,
  SaveQuizResult
} from '../types/quiz';
import Session from '../types/session';
import { checkQuestionAnswer, validateQuestionAnswerDataType, validateUserId } from './helper';
import { QuizWAnswerMapper } from '../types/mapper';

export async function getQuizList(): Promise<QuizSummary[]> {
  const list = await QuizModel.find();

  return list.map(val => QuizWAnswerMapper.toQuizSummary(val.toPlain()));
}

export async function getQuizDocument(id: string) {
  const quizPackage = await QuizModel.findById(id);

  if (!quizPackage) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

  return quizPackage;
}

export async function getQuiz(id: string): Promise<Quiz> {
  const quizPackage = await getQuizDocument(id);

  return QuizWAnswerMapper.toQuiz(quizPackage.toPlain());
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
  validateQuestionAnswerDataType(item.answer, answer);
  return {
    correct: checkQuestionAnswer(item, item.answer, answer)
  };
}

export async function createQuiz(
  session: Session,
  title: string,
  questions?: Array<QuestionWAnswerWoId>
): Promise<CreateQuizResult> {
  const paketDb = new QuizModel({
    userId: session.user!.id,
    title,
    questions
  } as QuizWAnswer);

  await paketDb.save();
  return {
    id: paketDb.id
  };
}

export async function getQuizForEditor(session: Session, id: string): Promise<QuizWAnswer> {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);
  return doc.toPlain();
}

export async function deleteQuiz(session: Session, id: string) {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);
  await doc.remove();
}

export async function saveQuiz(
  session: Session,
  id: string,
  quiz: QuizWAnswer
): Promise<SaveQuizResult> {
  const doc = await getQuizDocument(id);
  await validateUserId(session, doc.userId);

  const result: SaveQuizResult = {
    newQuestionsId: {}
  };
  doc.title = quiz.title;
  doc.set(
    'questions',
    quiz.questions.map(question => {
      let id = question.id;

      if (id.startsWith('new-')) {
        const oldId = id;
        id = new Types.ObjectId().toHexString();
        result.newQuestionsId[oldId] = id;
      }

      return {
        _id: id,
        ...question
      };
    })
  );

  await doc.save();
  return result;
}
