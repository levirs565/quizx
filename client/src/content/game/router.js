import GameBoard from "./views/GameBoard.vue";
import GameResult from "./views/GameResult.vue";

export default [
  {
    path: "permainan/:game_id/board",
    props: true,
    component: GameBoard,
  },
  {
    path: "permainan/:game_id",
    component: GameResult,
    props: true,
  },
];
