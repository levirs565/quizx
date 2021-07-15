import PaketSoalList from './views/PaketSoalList.vue';
import PaketSoal from './views/PaketSoal.vue';

export default [
  {
    path: 'soal',
    component: PaketSoalList
  },
  {
    path: 'soal/:paket_id',
    component: PaketSoal,
    props: true
  }
];
