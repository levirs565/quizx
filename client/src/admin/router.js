import AdminContainer from './Admin.vue';
import SiteRouter from './site/router';
import QuizRouter from './quiz/router';

export default [
  {
    path: '/admin',
    component: AdminContainer,
    children: [...SiteRouter, ...QuizRouter]
  }
];
