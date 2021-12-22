import { Types, Document } from 'mongoose';
import { QuizModelName } from '../schemas/quiz.schema';
import {
  AnswerQuestionResult,
  CreateQuizResult,
  Quiz,
  QuizSummary,
  SaveQuizResult,
  CreateQuizParameters
} from '../types/quiz';
import Session from '../types/session';
import {
  checkQuestionAnswer,
  validateQuestionAnswerDataType,
  validateUserId,
  validateUserLoggedIn
} from '../common/service.helper';
import { instanceToPlain } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseModel } from 'schemas/helper';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(QuizModelName) private readonly quizModel: BaseModel<Quiz>,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async getQuizList(): Promise<QuizSummary[]> {
    const list = await this.quizModel.find();

    return list.map(val => this.mapper.map(val.toClass(), QuizSummary, Quiz));
  }

  async getQuizDocument(id: string) {
    const quizPackage = await this.quizModel.findById(id);

    if (!quizPackage) throw new NotFoundException('Quiz not found');

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
    if (!item) throw new NotFoundException('Question not found');
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
    const paketDb = new this.quizModel({
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
