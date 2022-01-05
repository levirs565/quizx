import Vue from "vue";
import VueRouter from "vue-router";
import LayoutAuth from "@/layout/LayoutAuth.vue";
import PageLogin from "@/page/PageLogin.vue";
import PageRegister from "@/page/PageRegister.vue";
import LayoutContent from "@/layout/LayoutContent.vue";
import PageHome from "@/page/PageHome.vue";
import PageQuizList from "@/page/PageQuizList.vue";
import PageQuiz from "@/page/PageQuiz.vue";
import PageQuizEditor from "@/page/PageQuizEditor.vue";
import PageGameBoard from "@/page/PageGameBoard.vue";
import PageGameResult from "@/page/PageGameResult.vue";

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
    {
      path: "/",
      component: LayoutContent,
      children: [
        {
          path: "",
          component: PageHome,
          alias: "home",
        },

        {
          path: "quiz",
          component: PageQuizList,
        },
        {
          path: "quiz/:quiz_id",
          props: true,
          component: PageQuiz,
        },
        {
          path: "quiz/:quiz_id/edit",
          props: true,
          component: PageQuizEditor,
        },
        {
          path: "game/:game_id",
          component: PageGameResult,
          props: true,
        },
      ],
    },
    {
      path: "/game/:game_id/board",
      props: true,
      component: PageGameBoard,
    },
  ],
});

export default router;
