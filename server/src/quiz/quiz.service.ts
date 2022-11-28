import {
  AnswerQuestionResult,
  CreateQuizResult,
  Quiz,
  QuizSummary,
  SaveQuizResult,
  CreateQuizParameters,
  QuestionAnswer,
} from '@quizx/shared';
import Session from '../types/session.js';
import {
  checkQuestionAnswer,
  validateQuestionAnswerDataType,
  validateUserId,
  validateUserLoggedIn,
} from '../common/service.helper.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from './quiz.repository.js';

@Injectable()
export class QuizService {
  constructor(private readonly repository: QuizRepository) {}

  async getQuizList(): Promise<QuizSummary[]> {
    return this.repository.getSummaryList();
  }

  async getQuiz(id: string): Promise<Quiz> {
    const quiz = await this.repository.getById(id);

    quiz.questions.forEach((question) => {
      question.answer = undefined;
    });

    return quiz;
  }

  async getQuestionDocument(quizId: string, questionId: string) {
    const quiz = await this.repository.getById(quizId);
    const item = quiz.questions.find((item) => item.id == questionId);
    if (!item) throw new NotFoundException('Question not found');
    return item;
  }

  async answerQuestion(
    quizId: string,
    questionId: string,
    answer: QuestionAnswer | undefined
  ): Promise<AnswerQuestionResult> {
    const item = await this.getQuestionDocument(quizId, questionId);
    validateQuestionAnswerDataType(item.answer!, answer);
    return {
      correct: checkQuestionAnswer(item, item.answer!, answer),
    };
  }

  async createQuiz(
    session: Session,
    paramCreator: () => Promise<CreateQuizParameters>
  ): Promise<CreateQuizResult> {
    validateUserLoggedIn(session);

    const param = await paramCreator();
    const quiz = new Quiz();
    quiz.userId = session.user!.id;
    quiz.title = param.title;
    if (param.questions) quiz.questions = param.questions;

    await this.repository.createOne(quiz);
    return {
      id: quiz.id,
    };
  }

  async getQuizForEditor(session: Session, id: string): Promise<Quiz> {
    const quiz = await this.repository.getById(id);
    validateUserId(session, quiz.userId);
    return quiz;
  }

  async deleteQuiz(session: Session, id: string) {
    const quiz = await this.repository.getById(id);
    validateUserId(session, quiz.userId);
    await this.repository.deleteById(id);
  }

  async saveQuiz(session: Session, id: string, quiz: Quiz): Promise<SaveQuizResult> {
    const dbQuiz = await this.repository.getById(id);
    validateUserId(session, dbQuiz.userId);

    const result: SaveQuizResult = {
      newQuestionsId: {},
    };
    quiz.questions.forEach((question) => {
      const id = question.id!;
      if (id.startsWith('new-')) {
        question.id = this.repository.generateQuestionId();
        result.newQuestionsId[id] = question.id;
      }
    });

    await this.repository.updateById(quiz);
    return result;
  }

  async validateUserCanUpload(session: Session, id: string) {
    const quiz = await this.repository.getById(id);
    validateUserId(session, quiz.userId);
  }
}
