export interface AnswerQuizResult {
  benar?: boolean; 
}

export interface Question {
  id: number;
  soal: string;
  pilihan: Array<string>
}

export interface QuestionWAnswer extends Question {
  jawaban: number
}

export type QuestionWAnswerWoId = Omit<QuestionWAnswer, 'id'>


interface BaseQuiz {
  id: number;
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
