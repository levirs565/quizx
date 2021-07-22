export interface AnswerQuizResult {
  benar?: boolean; 
}

export interface AnswerQuestionRequestBody {
  jawaban: number
}

export interface CreateRenameQuizRequestBody {
  name: string 
}

export interface Question {
  id: string;
  soal: string;
  pilihan: Array<string>
}

export interface QuestionWAnswer extends Question {
  jawaban: number
}

export type QuestionWAnswerWoId = Omit<QuestionWAnswer, 'id'>


interface BaseQuiz {
  id: string;
  name: string;
}

export interface QuizSummary extends BaseQuiz {
  soalCount: number;
}

export interface Quiz extends BaseQuiz {
  soalList: Array<Question>;
}

export interface QuizWAnswer extends BaseQuiz {
  soalList: Array<QuestionWAnswer>;
}
