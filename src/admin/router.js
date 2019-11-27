import AdminContainer from './Admin.vue';
import SiteRouter from './site/router';

export default [
  {
    path: '/admin',
    component: AdminContainer,
    children: [...SiteRouter]
  }
];
