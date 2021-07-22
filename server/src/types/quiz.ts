export interface AnswerQuestionResult {
  correct?: boolean; 
}

export interface AnswerQuestionRequestBody {
  answer: number
}

export interface CreateRenameQuizRequestBody {
  title: string 
}

export interface Question {
  id: string;
  question: string;
  choices: Array<string>
}

export interface QuestionWAnswer extends Question {
  answer: number
}

export type QuestionWAnswerWoId = Omit<QuestionWAnswer, 'id'>


interface BaseQuiz {
  id: string;
  title: string;
}

export interface QuizSummary extends BaseQuiz {
  questionCount: number;
}

export interface Quiz extends BaseQuiz {
  questions: Array<Question>;
}

export interface QuizWAnswer extends BaseQuiz {
  questions: Array<QuestionWAnswer>;
}
