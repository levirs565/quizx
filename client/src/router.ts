import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/auth",
      component: () => import("@/layout/LayoutAuth.vue"),
      children: [
        {
          path: "login",
          component: () => import("@/page/PageLogin.vue"),
        },
        {
          path: "register",
          component: () => import("@/page/PageRegister.vue"),
        },
      ],
    },
    {
      path: "/",
      component: () => import("@/layout/LayoutContent.vue"),
      children: [
        {
          path: "",
          component: () => import("@/page/PageHome.vue"),
          alias: "home",
        },

        {
          path: "quiz",
          component: () => import("@/page/PageQuizList.vue"),
        },
        {
          path: "quiz/:quiz_id",
          props: true,
          component: () => import("@/page/PageQuiz.vue"),
        },
        {
          path: "quiz/:quiz_id/edit",
          props: true,
          component: () => import("@/page/PageQuizEditor.vue"),
        },
        {
          path: "game/:game_id",
          component: () => import("@/page/PageGameResult.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/game/:game_id/board",
      props: true,
      component: () => import("@/page/PageGameBoard.vue"),
    },
  ],
});

export default router;
