import GameConfig from './views/GameConfig.vue';
import GameBoard from './views/GameBoard.vue';
import GameResult from './views/GameResult.vue';

export default [
  {
    path: 'permainan/config',
    component: GameConfig
  },
  {
    path: 'permainan/board',
    component: GameBoard
  },
  {
    path: 'permainan/result',
    component: GameResult
  }
];
