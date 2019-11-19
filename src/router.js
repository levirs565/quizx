import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Permainan from './views/Permainan.vue';
import PaketSoalList from './views/PaketSoalList.vue';
import PaketSoal from './views/PaketSoal.vue';
import Soal from './views/Soal.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/soal/',
      component: PaketSoalList,
      alias: 'paket_soal_list'
    },
    {
      path: '/soal/:paket_id',
      props: true,
      component: PaketSoal,
      children: [
        {
          path: ':soal_id',
          props: true,
          component: Soal
        }
      ]
    },
    {
      path: '/',
      component: Home,
      alias: 'home'
    },
    {
      path: '/login',
      component: Login,
      alias: 'login'
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/permainan',
      component: Permainan,
      alias: 'permainan'
    }
  ]
});

export default router;
