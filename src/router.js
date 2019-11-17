import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Permainan from './views/Permainan.vue';
import SoalCollectionList from './views/SoalCollectionList.vue';
import SoalCollection from './views/SoalCollection.vue';
import Soal from './views/Soal.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/soal/',
      component: SoalCollectionList,
      alias: 'soal_collection_list'
    },
    {
      path: '/soal/:col_id',
      props: true,
      component: SoalCollection,
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
      path: '/permainan',
      component: Permainan,
      alias: 'permainan'
    }
  ]
});

export default router;
