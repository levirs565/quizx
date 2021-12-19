import { Types } from 'mongoose';
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
import { mapper } from '../types/mapper';
import { classToPlain, instanceToPlain } from 'class-transformer';

export class QuizService {
  async getQuizList(): Promise<QuizSummary[]> {
    const list = await QuizModel.find();

    return list.map(val => mapper.map(val.toClass(), QuizSummary, Quiz));
  }

  async getQuizDocument(id: string) {
    const quizPackage = await QuizModel.findById(id);

    if (!quizPackage) throw new EError(...E.E201_SOAL_PAKET_NOT_FOUND);

    return quizPackage;
  }

  async getQuiz(id: string): Promise<Quiz> {
    const quizPackage = await this.getQuizDocument(id);
    const quiz = quizPackage.toClass();

    quiz.questions.forEach(question => {
      question.answer = undefined;
    });

    return quiz;
  }

  async getQuestionDocument(quizId: string, questionId: string) {
    const quizPackage = await this.getQuizDocument(quizId);
    const item = quizPackage.questions.find(item => item.id == questionId);
    if (!item) throw new EError(...E.E202_SOAL_NOT_FOUND);
    return item;
  }

  async answerQuestion(
    quizId: string,
    questionId: string,
    answer: number | string | null
  ): Promise<AnswerQuestionResult> {
    const item = await this.getQuestionDocument(quizId, questionId);
    validateQuestionAnswerDataType(item.answer!, answer);
    return {
      correct: checkQuestionAnswer(item, item.answer!, answer)
    };
  }

  async createQuiz(session: Session, param: CreateQuizParameters): Promise<CreateQuizResult> {
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

  async getQuizForEditor(session: Session, id: string): Promise<Quiz> {
    const doc = await this.getQuizDocument(id);
    await validateUserId(session, doc.userId);
    return doc.toClass();
  }

  async deleteQuiz(session: Session, id: string) {
    const doc = await this.getQuizDocument(id);
    await validateUserId(session, doc.userId);
    await doc.remove();
  }

  async saveQuiz(session: Session, id: string, quiz: Quiz): Promise<SaveQuizResult> {
    const doc = await this.getQuizDocument(id);
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

  async validateUserCanUpload(session: Session, id: string) {
    const doc = await this.getQuizDocument(id);
    await validateUserId(session, doc.userId);
  }
}

export default new QuizService();
