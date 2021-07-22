export interface PlayGameRequestBody {
  soalId: string;
  interaktif: boolean;
}

export interface GameResult {
  tidakDiJawab: number;
  benar: number;
  salah: number;
}

export interface GameState {
  permainanStarted: boolean;
  permainan?: {
    soalPaketID: number;
    interaktif: boolean;
    soalCount: number;
    jawabanCount: number;
  }
}

export interface Game {
  id: string;
  quizId: string;
  quizTitle: string;
  isPlaying: boolean;
  isInteractive: boolean;
  result?: GameResult;
}
