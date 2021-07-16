import QuizList from './views/QuizList.vue';
import Quiz from './views/Quiz.vue';

export default [
  {
    path: 'soal',
    component: QuizList
  },
  {
    path: 'soal/:quiz_id',
    component: Quiz,
    props: true
  }
];
