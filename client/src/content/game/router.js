import GameResult from "./views/GameResult.vue";

export default [
  {
    path: "permainan/:game_id",
    component: GameResult,
    props: true,
  },
];
