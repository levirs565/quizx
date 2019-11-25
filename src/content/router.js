import ContentContainer from './Content.vue';
import Home from './views/Home.vue';
import PaketSoalList from './views/PaketSoalList.vue';
import PaketSoal from './views/PaketSoal.vue';
import Soal from './views/Soal.vue';
import PermainanConfig from './views/PermainanConfig.vue';
import PermainanBoard from './views/PermainanBoard.vue';
import PermainanResult from './views/PermainanResult.vue';

export default [
  {
    path: '/',
    component: ContentContainer,
    children: [
      {
        path: '',
        component: Home,
        alias: 'home'
      },
      {
        path: 'soal',
        component: PaketSoalList,
        alias: 'paket_soal_list'
      },
      {
        path: 'soal/:paket_id',
        props: true,
        component: PaketSoal,
        children: [
          {
            path: ':soal_id',
            props: true,
            component: Soal
          }
        ]
      },
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
    ]
  }
];
