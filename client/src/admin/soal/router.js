import PaketSoalList from './views/PaketSoalList.vue';
import PaketSoal from './views/PaketSoal.vue';
import Soal from './views/Soal.vue';

export default [
  {
    path: 'soal',
    component: PaketSoalList
  },
  {
    path: 'soal/:paket_id',
    component: PaketSoal,
    props: true,
    children: [
      {
        path: ':soal_id',
        component: Soal,
        props: true
      }
    ]
  }
];
