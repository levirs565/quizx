import ContentContainer from './Content.vue';
import SiteRouter from './site/router';
import SoalRouter from './soal/router';
import PermainanRouter from './permainan/router';

export default [
  {
    path: '/',
    component: ContentContainer,
    children: [...SiteRouter, ...SoalRouter, ...PermainanRouter]
  }
];
