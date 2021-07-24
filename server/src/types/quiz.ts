export interface AnswerQuestionResult {
  correct?: boolean; 
}

// WARNING: Change schema if change this interface
export interface AnswerQuestionRequestBody {
  answer: number
}

// WARNING: Change schema if change this interface
export interface CreateRenameQuizRequestBody {
  title: string 
}

// WARNING: Change schema if change this interface
export interface Question {
  id: string;
  question: string;
  choices: Array<string>
}

// WARNING: Change schema if change this interface
export interface QuestionWAnswer extends Question {
  answer: number
}

// WARNING: Change schema if change this interface
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
