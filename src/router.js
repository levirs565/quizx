import Vue from 'vue'
import VueRouter from 'vue-router'
import Soal from './views/Soal.vue'
import Home from './views/Home.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/soal/:soal_id',
      props: true,
      component: Soal
    },
    {
      path: '/',
      component: Home,
    }
  ]
})

export default router
