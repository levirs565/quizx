import AdminContainer from './Admin.vue';
import SiteRouter from './site/router';
import SoalRouter from './soal/router';

export default [
  {
    path: '/admin',
    component: AdminContainer,
    children: [...SiteRouter, ...SoalRouter]
  }
];
