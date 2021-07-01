import PermainanConfig from './views/PermainanConfig.vue';
import PermainanBoard from './views/PermainanBoard.vue';
import PermainanResult from './views/PermainanResult.vue';

export default [
  {
    path: 'permainan/config',
    component: PermainanConfig
  },
  {
    path: 'permainan/board',
    component: PermainanBoard
  },
  {
    path: 'permainan/result',
    component: PermainanResult
  }
];
