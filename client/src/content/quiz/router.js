import QuizList from './views/QuizList.vue';
import Quiz from './views/Quiz.vue';
import QuizEditor from './views/QuizEditor.vue';

export default [
  {
    path: 'quiz',
    component: QuizList,
  },
  {
    path: 'quiz/:quiz_id',
    props: true,
    component: Quiz
  },
  {
    path: 'quiz/:quiz_id/edit',
    props: true,
    component: QuizEditor
  }
];
