import ContentContainer from "./Content.vue";
import Home from "@/content/site/views/Home.vue";
import QuizList from "@/content/quiz/views/QuizList.vue";
import Quiz from "@/content/quiz/views/Quiz.vue";
import QuizEditor from "@/content/quiz/views/QuizEditor.vue";
import GameBoard from "@/content/game/views/GameBoard.vue";
import GameResult from "@/content/game/views/GameResult.vue";

export default [
  {
    path: "/",
    component: ContentContainer,
    children: [
      {
        path: "",
        component: Home,
        alias: "home",
      },

      {
        path: "quiz",
        component: QuizList,
      },
      {
        path: "quiz/:quiz_id",
        props: true,
        component: Quiz,
      },
      {
        path: "quiz/:quiz_id/edit",
        props: true,
        component: QuizEditor,
      },
      {
        path: "game/:game_id",
        component: GameResult,
        props: true,
      },
    ],
  },
  {
    path: "/game/:game_id/board",
    props: true,
    component: GameBoard,
  },
];
