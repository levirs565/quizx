import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import PaketSoalList from './views/PaketSoalList.vue';
import PaketSoal from './views/PaketSoal.vue';
import Soal from './views/Soal.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import PermainanConfig from './views/PermainanConfig.vue';
import PermainanBoard from './views/PermainanBoard.vue';
import PermainanResult from './views/PermainanResult.vue';

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
      path: '/permainan/config',
      component: PermainanConfig
    },
    {
      path: '/permainan/board',
      component: PermainanBoard
    },
    {
      path: '/permainan/result',
      component: PermainanResult
    }
  ]
});

export default router;
