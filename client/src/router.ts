import Vue from "vue";
import VueRouter from "vue-router";
import LayoutAuth from "@/layout/LayoutAuth.vue";
import PageLogin from "@/page/PageLogin.vue";
import PageRegister from "@/page/PageRegister.vue";
import ContentRouter from "@/content/router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/auth",
      component: LayoutAuth,
      children: [
        {
          path: "login",
          component: PageLogin,
        },
        {
          path: "register",
          component: PageRegister,
        },
      ],
    },
    ...ContentRouter,
  ],
});

export default router;
