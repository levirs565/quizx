import Vue from 'vue';
import VueRouter from 'vue-router';
import Soal from './views/Soal.vue';
import Home from './views/Home.vue';
import Permainan from './views/Permainan.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/soal/:soal_id',
      props: true,
      component: Soal,
      alias: 'soal'
    },
    {
      path: '/',
      component: Home,
      alias: 'home'
    },
    {
      path: '/permainan',
      component: Permainan,
      alias: 'permainan'
    }
  ]
});

export default router;
