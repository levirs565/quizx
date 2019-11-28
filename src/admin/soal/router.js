import SoalContainer from './Soal';
import PaketSoalList from './views/PaketSoalList.vue';

export default [
  {
    path: 'soal',
    component: SoalContainer,
    children: [
      {
        path: '',
        component: PaketSoalList
      }
    ]
  }
];
