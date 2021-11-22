import { GameSummary, Game } from './game';
import { QuestionWAnswer, QuizSummary, QuizWAnswer, Question, Quiz } from './quiz';

export namespace QuestionWAnswerMapper {
  export function toQuestion(question: QuestionWAnswer): Question {
    const { answer, ...rest } = question;
    return rest;
  }
}

export namespace QuizWAnswerMapper {
  export function toQuizSummary(quiz: QuizWAnswer): QuizSummary {
    const { questions, ...rest } = quiz;
    return {
      ...rest,
      questionCount: questions.length
    };
  }

  export function toQuiz(quiz: QuizWAnswer): Quiz {
    const { questions, ...rest } = quiz;
    return {
      ...rest,
      questions: questions.map(item => QuestionWAnswerMapper.toQuestion(item))
    };
  }
}

export namespace GameMapper {
  export function toGameSummary(gameDb: Game): GameSummary {
    const { questions, correctAnswers, ...rest } = gameDb
    return rest
  }
}