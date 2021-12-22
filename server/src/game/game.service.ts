import { GameModelName } from '../schemas/game.schema';
import { QuizService } from 'quiz/quiz.service';
import Session from '../types/session';
import { GameSummary, GamePreference, GameResult, Game, QuestionState } from '../types/game';
import { AnswerQuestionResult } from '../types/quiz';
import {
  validateUserLoggedIn,
  validateUserId,
  validateQuestionAnswerDataType,
  checkQuestionAnswer
} from '../common/service.helper';
import shuffle from 'just-shuffle';
import { instanceToPlain } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseModel } from 'schemas/helper';
import { CommonServiceException } from 'common/common-service.exception';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(GameModelName) private readonly gameModel: BaseModel<Game>,
    private readonly quizService: QuizService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async playGame(
    session: Session,
    quizId: string,
    preference: GamePreference
  ): Promise<GameSummary> {
    const user = await validateUserLoggedIn(session);
    const playedGame = await this.gameModel.findOne({ userId: user.id, isPlaying: true });
    if (playedGame) throw new CommonServiceException('Last game not finished');

    const quiz = await (await this.quizService.getQuizDocument(quizId)).toClass();

    if (preference.shuffleQuestions) quiz.questions = shuffle(quiz.questions);

    const correctAnswers = quiz.questions.map(question => question.answer!);
    quiz.questions.forEach(question => {
      question.answer = undefined;
    });

    const gameObject: Omit<Game, 'id'> = {
      userId: user.id,
      quizId,
      quizTitle: quiz.title,
      questions: instanceToPlain(quiz).questions,
      isPlaying: true,
      correctAnswers,
      ...preference
    };
    const game = new this.gameModel(gameObject);

    await game.save();
    return this.mapper.map(game.toClass(), GameSummary, Game);
  }

  private async getGameInternal(id: string) {
    const game = await this.gameModel.findOne({ _id: id });

    if (game) return game;

    throw new NotFoundException('Game not found');
  }

  async getGame(id: string): Promise<GameSummary> {
    const game = (await this.getGameInternal(id)).toClass();
    if (game.isPlaying) game.correctAnswers = undefined;

    return game;
  }

  async putAnswer(
    session: Session,
    gameId: string,
    questionId: string,
    questionAnswer: number | string | null
  ): Promise<AnswerQuestionResult> {
    const game = await this.getGameInternal(gameId);
    await validateUserId(session, game.userId);

    const questionDocumentIndex = game.questions.findIndex(item => item.id == questionId);

    if (questionDocumentIndex == -1) {
      throw new NotFoundException('Question not found in this game');
    }

    const questionDocument = game.questions[questionDocumentIndex];
    const correctAnswer = game.correctAnswers![questionDocumentIndex];

    validateQuestionAnswerDataType(correctAnswer, questionAnswer);
    questionDocument.answer = questionAnswer ?? undefined;

    await game.save();

    if (game.isInteractive) {
      return {
        correct: checkQuestionAnswer(questionDocument, correctAnswer, questionAnswer)
      };
    }

    return {};
  }

  async finishGame(session: Session, gameId: string) {
    const game = await this.getGameInternal(gameId);
    await validateUserId(session, game.userId);
    const { questions, correctAnswers } = game.toClass();
    const result: GameResult = {
      unanswered: 0,
      correct: 0,
      wrong: 0,
      questionsState: []
    };

    questions.forEach((question, index) => {
      const actualAnswer = correctAnswers![index];
      const userAnswer = question.answer;
      let state: QuestionState;

      if (userAnswer === undefined) {
        result.unanswered += 1;
        state = QuestionState.Unanswered;
      } else if (checkQuestionAnswer(question, actualAnswer, userAnswer)) {
        result.correct += 1;
        state = QuestionState.Correct;
      } else {
        result.wrong += 1;
        state = QuestionState.Incorrect;
      }
      result.questionsState.push(state);
    });

    game.isPlaying = false;
    game.result = result;
    await game.save();
  }
}
