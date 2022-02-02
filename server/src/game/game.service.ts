import { GameModelName } from '../schemas/game.schema';
import { QuizService } from 'quiz/quiz.service';
import Session from '../types/session';
import {
  GameSummary,
  GamePreference,
  GameResult,
  Game,
  QuestionState,
  ExamGamePreference,
  GameData,
  ExamGameData,
  FlashCardGameData,
  FlashCardGamePreference,
  GameAnswerResult,
} from '../types/game';
import { AnswerQuestionResult, Question, QuestionAnswer } from '../types/quiz';
import {
  validateUserLoggedIn,
  validateUserId,
  validateQuestionAnswerDataType,
  checkQuestionAnswer,
  addMinuteToDate,
} from '../common/service.helper';
import shuffle from 'just-shuffle';
import { instanceToPlain } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseModel, BaseModelMethods } from 'schemas/helper';
import { CommonServiceException } from 'common/common-service.exception';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Document, Types } from 'mongoose';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(GameModelName) private readonly gameModel: BaseModel<Game>,
    private readonly quizService: QuizService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  validateGamePlaying(game: Game) {
    if (!game.isPlaying) throw new CommonServiceException('Game is finished');
  }

  async playGame(
    session: Session,
    quizId: string,
    preference: GamePreference
  ): Promise<GameSummary> {
    const user = validateUserLoggedIn(session);
    const playedGame = await this.gameModel.findOne({ userId: user.id, isPlaying: true });
    if (playedGame) throw new CommonServiceException('Last game not finished');

    const quiz = (await this.quizService.getQuizDocument(quizId)).toClass();

    if (preference.shuffleQuestions) quiz.questions = shuffle(quiz.questions);

    const correctAnswers = quiz.questions.map((question) => question.answer!);
    quiz.questions.forEach((question) => {
      question.answer = undefined;
    });

    const game = new Game();
    game.startTime = new Date();
    game.userId = user.id;
    game.quizId = quizId;
    game.quizTitle = quiz.title;
    game.questions = quiz.questions;
    game.isPlaying = true;
    game.correctAnswers = correctAnswers;

    if (preference instanceof ExamGamePreference) {
      const data = new ExamGameData();
      data.preference = preference;
      if (preference.examTimeMinute) {
        data.maxFinishTime = addMinuteToDate(game.startTime, preference.examTimeMinute);
      }
      game.data = data;
    } else if (preference instanceof FlashCardGamePreference) {
      const data = new FlashCardGameData();
      data.preference = preference;
      data.currentQuestionIndex = 0;
      if (preference.questionTimeMinute) {
        data.currentQuestionMaxTime = addMinuteToDate(
          game.startTime,
          preference.questionTimeMinute
        );
      }
      if (preference.retryCount) {
        data.currentQuestionRetryCount = 0;
      }
      game.data = data;
      game.questionsState = [];
    }

    const gameDb = new this.gameModel(instanceToPlain(game));

    await gameDb.save();
    return this.mapper.map(gameDb.toClass(), GameSummary, Game);
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
  ): Promise<GameAnswerResult> {
    const gameDb = await this.getGameInternal(gameId);

    validateUserId(session, gameDb.userId);
    this.validateGamePlaying(gameDb);

    const currentDate = new Date();
    const game = gameDb.toClass();
    if (
      game.data instanceof ExamGameData &&
      game.data.maxFinishTime &&
      currentDate > game.data.maxFinishTime
    ) {
      await this.internalFinishGame(gameDb, game);
      throw new CommonServiceException('Game is timeout');
    }

    const questionIndex = gameDb.questions.findIndex((item) => item.id == questionId);

    if (questionIndex == -1) {
      throw new NotFoundException('Question not found in this game');
    }

    const questionDocument = gameDb.questions[questionIndex];
    const correctAnswer = gameDb.correctAnswers![questionIndex];
    let acceptedAnswer = questionAnswer;
    const result: GameAnswerResult = {};

    if (game.data instanceof FlashCardGameData) {
      if (questionIndex != game.data.currentQuestionIndex) {
        throw new CommonServiceException('Cannot answer question that is not current question');
      }

      let mustNext = false;

      if (game.data.currentQuestionMaxTime && currentDate > game.data.currentQuestionMaxTime) {
        mustNext = true;
        acceptedAnswer = questionDocument.answer ?? null;
      }

      validateQuestionAnswerDataType(correctAnswer, acceptedAnswer);

      const data = gameDb.data as FlashCardGameData;
      if (data.preference.retryCount) {
        data.currentQuestionRetryCount!!++;
        if (data.currentQuestionRetryCount == data.preference.retryCount) {
          mustNext = true;
        } else if (data.currentQuestionRetryCount!! > data.preference.retryCount) {
          throw new CommonServiceException('Number of retry exceeded max allowed retry');
        }
      }

      const state = this.generateQuestionState(
        game.questions[questionIndex],
        acceptedAnswer,
        correctAnswer
      );
      if (state == QuestionState.Correct) {
        mustNext = true;
      }

      if (mustNext) {
        gameDb.questionsState!!.push(state);
        data.currentQuestionIndex++;

        if (data.preference.retryCount) {
          data.currentQuestionRetryCount = 0;
        }

        if (data.preference.questionTimeMinute) {
          data.currentQuestionMaxTime = addMinuteToDate(
            new Date(),
            data.preference.questionTimeMinute
          );
        }
      }

      result.state = state;
      result.next = mustNext;
    }

    validateQuestionAnswerDataType(correctAnswer, acceptedAnswer);
    questionDocument.answer = acceptedAnswer ?? undefined;

    await gameDb.save();

    return result;
  }

  async finishGame(session: Session, gameId: string) {
    const game = await this.getGameInternal(gameId);

    validateUserId(session, game.userId);
    this.validateGamePlaying(game);
    await this.internalFinishGame(game, game.toClass());
  }

  private generateQuestionState(
    question: Question,
    userAnswer: QuestionAnswer | null,
    actualAnswer: QuestionAnswer
  ): QuestionState {
    if (userAnswer === undefined) {
      return QuestionState.Unanswered;
    } else if (checkQuestionAnswer(question, actualAnswer, userAnswer)) {
      return QuestionState.Correct;
    } else {
      return QuestionState.Incorrect;
    }
  }

  private async internalFinishGame(
    game: Document<any, any, Game> & Game,
    { questions, correctAnswers }: Game
  ) {
    const result: GameResult = {
      unanswered: 0,
      correct: 0,
      wrong: 0,
    };
    const questionsState: Array<QuestionState> = [];

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
      questionsState.push(state);
    });

    game.isPlaying = false;
    game.result = result;
    game.questionsState = questionsState;
    await game.save();
  }
}
