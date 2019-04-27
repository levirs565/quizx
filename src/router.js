import Vue from 'vue'
import VueRouter from 'vue-router'
import Soal from './views/Soal.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/soal/:soal_id',
      props: true,
      component: Soal
    }
  ]
})

export default router
