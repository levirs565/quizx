import PaketSoalList from './views/PaketSoalList.vue';
import PaketSoal from './views/PaketSoal.vue';

export default [
  {
    path: 'soal',
    component: PaketSoalList,
    alias: 'paket_soal_list'
  },
  {
    path: 'soal/:paket_id',
    props: true,
    component: PaketSoal
  }
];
