import ContentContainer from './Content.vue';
import SiteRouter from './site/router';
import QuizRouter from './quiz/router';
import PermainanRouter from './permainan/router';

export default [
  {
    path: '/',
    component: ContentContainer,
    children: [...SiteRouter, ...QuizRouter, ...PermainanRouter]
  }
];
