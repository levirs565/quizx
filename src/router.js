import Vue from 'vue';
import VueRouter from 'vue-router';
import CoreRouter from '@/core/router';
import ContentRouter from '@/content/router';
import AdminRouter from '@/admin/router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [...CoreRouter, ...ContentRouter, ...AdminRouter]
});

export default router;
