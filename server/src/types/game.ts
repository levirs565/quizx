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
