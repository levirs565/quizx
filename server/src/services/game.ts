import GameModel from '../models/game';
import QuizService from './quiz';
import Session from '../types/session';
import { EError, E } from '../error';
import { GameSummary, GamePreference, GameResult, Game, QuestionState } from '../types/game';
import { AnswerQuestionResult, Question, questionDiscriminator } from '../types/quiz';
import {
  validateUserLoggedIn,
  validateUserId,
  validateQuestionAnswerDataType,
  checkQuestionAnswer
} from './helper';
import shuffle from 'just-shuffle';
import { mapper } from '../types/mapper';
import { instanceToPlain } from 'class-transformer';

export class GameService {
  async playGame(
    session: Session,
    quizId: string,
    preference: GamePreference
  ): Promise<GameSummary> {
    const user = await validateUserLoggedIn(session);
    const playedGame = await GameModel.findOne({ userId: user.id, isPlaying: true });
    if (playedGame) throw new EError(...E.E402_PERMAINAN_NOT_FINISHED);

    const quiz = await (await QuizService.getQuizDocument(quizId)).toClass();

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
    const game = new GameModel(gameObject);

    await game.save();
    return mapper.map(game.toClass(), GameSummary, Game);
  }

  async getGameInternal(id: string) {
    const game = await GameModel.findOne({ _id: id });

    if (game) return game;

    throw new EError(...E.E404_GAME_NOT_FOUND);
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
      throw new EError(...E.E403_PERMAINAN_SOAL_NOT_FOUND);
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

export default new GameService();
