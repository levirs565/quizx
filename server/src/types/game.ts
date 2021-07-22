export interface PlayGameRequestBody {
  quizId: string;
  isInteractive: boolean;
}

export interface GameResult {
  notAnswered: number;
  correct: number;
  wrong: number;
}

export interface Game {
  id: string;
  quizId: string;
  quizTitle: string;
  isPlaying: boolean;
  isInteractive: boolean;
  result?: GameResult;
}
