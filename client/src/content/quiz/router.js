import QuizList from './views/QuizList.vue';
import Quiz from './views/Quiz.vue';

export default [
  {
    path: 'soal',
    component: QuizList,
    alias: 'paket_soal_list'
  },
  {
    path: 'soal/:paket_id',
    props: true,
    component: Quiz
  }
];
