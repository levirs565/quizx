import PaketSoalList from './views/PaketSoalList.vue';
import PaketSoal from './views/PaketSoal.vue';
import Soal from './views/Soal.vue';

export default [
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
  }
];
