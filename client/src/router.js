import Vue from "vue";
import VueRouter from "vue-router";
import CoreRouter from "@/core/router";
import ContentRouter from "@/content/router";
import GameBoard from "@/content/game/views/GameBoard.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    ...CoreRouter,
    ...ContentRouter,
    {
      path: "/permainan/:game_id/board",
      props: true,
      component: GameBoard,
    },
  ],
});

export default router;
