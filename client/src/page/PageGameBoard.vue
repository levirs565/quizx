<template>
  <v-app>
    <base-app-bar :isLoading="state && state.isLoading">
      <v-toolbar-title>Game</v-toolbar-title>
    </base-app-bar>
    <resource-main-container :state="state" @reload="updateState">
      <exam-game-board
        v-if="type == 'exam'"
        :game="game"
        @finish="finish"
        @answerChanged="answerChanged"
      />
      <flash-card-game-board
        v-else-if="type == 'flash-card'"
        :game="game"
        @finish="finish"
        @answerChanged="answerChanged"
        @submitAnswer="submitAnswer"
      />
    </resource-main-container>
  </v-app>
</template>

<script>
import { Game } from "@/api";
import { updateResourceStateByPromise } from "@/components/resource/ResourceWrapper.vue";
import BaseAppBar from "@/components/BaseAppBar.vue";
import ResourceMainContainer from "@/components/resource/ResourceMainContainer.vue";
import ExamGameBoard from "@/components/game/ExamGameBoard.vue";
import FlashCardGameBoard from "@/components/game/FlashCardGameBoard.vue";

export default {
  components: {
    BaseAppBar,
    ResourceMainContainer,
    ExamGameBoard,
    FlashCardGameBoard,
  },
  props: {
    game_id: String,
  },
  data() {
    return {
      game: {},
      type: "",
      state: null,
    };
  },
  methods: {
    answerChanged(data) {
      let answer = data.answer;
      if (answer == "") answer = null;
      let id = data.question.id;
      Game.putAnswer(this.game_id, id, answer);
    },
    submitAnswer(index, id) {
      Game.submitAnswer(this.game_id, id).then((result) => {
        this.game.data.currentQuestionIndex = result.currentQuestionIndex;
        this.game.data.currentQuestionRetryCount =
          result.currentQuestionRetryCount;
        this.game.data.currentQuestionMaxTime = result.currentQuestionMaxTime;

        if (this.game.questionsState.length == index) {
          this.game.questionsState.push(result.state);
        } else {
          this.game.questionsState[index] = result.state;
        }
      });
    },
    updateState() {
      updateResourceStateByPromise(
        Game.getGame(this.game_id).then((val) => {
          this.game = val;
          this.type = val.data.type;

          if (!this.game.isPlaying) return;
        }),
        (val) => {
          this.state = val;
        }
      );
    },
    finish() {
      Game.finishGame(this.game_id).then(() => {
        this.$router.replace(`/game/${this.game_id}/`);
      });
    },
  },
  mounted() {
    this.updateState();
  },
};
</script>

<style scoped></style>
