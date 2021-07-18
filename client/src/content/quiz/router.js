import QuizList from './views/QuizList.vue';
import Quiz from './views/Quiz.vue';

export default [
  {
    path: 'quiz',
    component: QuizList,
  },
  {
    path: 'quiz/:quiz_id',
    props: true,
    component: Quiz
  }
];
