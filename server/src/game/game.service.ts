import Session from '../types/session.js';
import {
  GameSummary,
  GamePreference,
  GameResult,
  Game,
  QuestionState,
  ExamGamePreference,
  ExamGameData,
  FlashCardGameData,
  FlashCardGamePreference,
  GameAnswerResult,
  Question,
  QuestionAnswer,
} from '@quizx/shared';
import {
  validateUserLoggedIn,
  validateUserId,
  validateQuestionAnswerDataType,
  checkQuestionAnswer,
  addSecondToDate,
} from '../common/service.helper.js';
import shuffle from 'just-shuffle';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommonServiceException } from '../common/common-service.exception.js';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { GameRepository } from './game.repository.js';
import { QuizRepository } from '../quiz/quiz.repository.js';

@Injectable()
export class GameService {
  constructor(
    private readonly repository: GameRepository,
    private readonly quizRepository: QuizRepository,
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
    if (await this.repository.hasPlayed(user.id))
      throw new CommonServiceException('Last game not finished');

    const quiz = await this.quizRepository.getById(quizId);

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
      if (preference.examTimeSecond) {
        data.maxFinishTime = addSecondToDate(game.startTime, preference.examTimeSecond);
      }
      game.data = data;
    } else if (preference instanceof FlashCardGamePreference) {
      const data = new FlashCardGameData();
      data.preference = preference;
      data.currentQuestionIndex = 0;
      if (preference.questionTimeSecond) {
        data.currentQuestionMaxTime = addSecondToDate(
          game.startTime,
          preference.questionTimeSecond
        );
      }
      if (preference.retryCount) {
        data.currentQuestionRetryCount = 0;
      }
      game.data = data;
      game.questionsState = [];
    }

    await this.repository.createOne(game);
    return this.mapper.map(game, Game, GameSummary);
  }

  async getGame(id: string): Promise<GameSummary> {
    const game = await this.repository.getById(id);
    if (game.isPlaying) game.correctAnswers = undefined;

    return game;
  }

  private findGameQuestionById(game: Game, questionId: string) {
    const questionIndex = game.questions.findIndex((item) => item.id == questionId);

    if (questionIndex == -1) {
      throw new NotFoundException('Question not found in this game');
    }

    const correctAnswer = game.correctAnswers![questionIndex];

    return {
      index: questionIndex,
      correctAnswer,
    };
  }

  private validateAnswerCurrentQuestion(index: number, data: FlashCardGameData) {
    if (index != data.currentQuestionIndex) {
      throw new CommonServiceException('Cannot answer question that is not current question');
    }
  }

  async putAnswer(
    session: Session,
    gameId: string,
    questionId: string,
    questionAnswer: QuestionAnswer | undefined
  ) {
    const game = await this.repository.getById(gameId);

    validateUserId(session, game.userId);
    this.validateGamePlaying(game);

    const currentDate = new Date();
    if (
      game.data instanceof ExamGameData &&
      game.data.maxFinishTime &&
      currentDate > game.data.maxFinishTime
    ) {
      await this.internalFinishGame(game);
      throw new CommonServiceException('Game is timeout');
    }

    const question = this.findGameQuestionById(game, questionId);

    if (game.data instanceof FlashCardGameData) {
      this.validateAnswerCurrentQuestion(question.index, game.data);
      if (game.data.currentQuestionMaxTime && currentDate > game.data.currentQuestionMaxTime) {
        throw new CommonServiceException('Question answer time is timeout');
      }
    }

    validateQuestionAnswerDataType(question.correctAnswer, questionAnswer);
    await this.repository.updateQuestionAnswer(game.id, question.index, questionAnswer);
  }

  async submitAnswer(
    session: Session,
    gameId: string,
    questionId: string
  ): Promise<GameAnswerResult> {
    const game = await this.repository.getById(gameId);

    validateUserId(session, game.userId);
    this.validateGamePlaying(game);

    if (!(game.data instanceof FlashCardGameData))
      throw new CommonServiceException('Submit only work for flash card game');

    const data = game.data as FlashCardGameData;
    let mustNext = false;

    const questionMeta = this.findGameQuestionById(game, questionId);

    this.validateAnswerCurrentQuestion(questionMeta.index, data);

    if (game.data.currentQuestionMaxTime && new Date() > game.data.currentQuestionMaxTime) {
      mustNext = true;
    }

    if (data.preference.retryCount) {
      data.currentQuestionRetryCount!!++;
      if (data.currentQuestionRetryCount == data.preference.retryCount) {
        mustNext = true;
      } else if (data.currentQuestionRetryCount!! > data.preference.retryCount) {
        throw new CommonServiceException('Number of retry exceeded max allowed retry');
      }
    }

    const question = game.questions[questionMeta.index];
    const state = this.generateQuestionState(question, question.answer, questionMeta.correctAnswer);
    if (state == QuestionState.Correct) {
      mustNext = true;
    }

    if (mustNext) {
      if (data.currentQuestionIndex + 1 < game.questions.length) {
        data.currentQuestionIndex++;

        if (data.preference.retryCount) {
          data.currentQuestionRetryCount = 0;
        }

        if (data.preference.questionTimeSecond) {
          data.currentQuestionMaxTime = addSecondToDate(
            new Date(),
            data.preference.questionTimeSecond
          );
        }
      } else {
        data.currentQuestionIndex = -1;
        data.currentQuestionRetryCount = undefined;
        data.currentQuestionMaxTime = undefined;
      }
    }

    await this.repository.updateFlashCard(game.id, data, mustNext ? state : undefined);

    const result = new GameAnswerResult();
    result.currentQuestionIndex = data.currentQuestionIndex;
    result.currentQuestionRetryCount = data.currentQuestionRetryCount;
    result.currentQuestionMaxTime = data.currentQuestionMaxTime;
    result.state = state;

    return result;
  }

  async finishGame(session: Session, gameId: string) {
    const game = await this.repository.getById(gameId);

    validateUserId(session, game.userId);
    this.validateGamePlaying(game);
    await this.internalFinishGame(game);
  }

  private generateQuestionState(
    question: Question,
    userAnswer: QuestionAnswer | undefined,
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

  private async internalFinishGame(game: Game) {
    const result: GameResult = {
      unanswered: 0,
      correct: 0,
      wrong: 0,
    };
    const questionsState: Array<QuestionState> = [];

    game.questions.forEach((question, index) => {
      const actualAnswer = game.correctAnswers![index];
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

    await this.repository.updateFinish(game.id, questionsState, result);
  }
}
