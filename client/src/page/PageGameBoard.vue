<template>
  <v-app>
    <molecule-app-bar :isLoading="state && state.isLoading">
      <v-toolbar-title>Game</v-toolbar-title>
    </molecule-app-bar>
    <organism-resource-main :state="state" @reload="updateState">
      <exam-game-board
        v-if="type == 'exam'"
        :game="game"
        @finish="finish"
        @answerChanged="answerChanged"
      />
    </organism-resource-main>
  </v-app>
</template>

<script>
import { Game } from "@/api";
import { updateResourceStateByPromise } from "@/components/ResourceWrapper.vue";
import MoleculeAppBar from "@/components/MoleculeAppBar.vue";
import OrganismResourceMain from "@/components/OrganismResourceMain.vue";
import ExamGameBoard from "@/components/ExamGameBoard.vue";

export default {
  components: {
    MoleculeAppBar,
    OrganismResourceMain,
    ExamGameBoard,
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
