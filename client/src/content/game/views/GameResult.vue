<template>
  <form class="box form" action="none" @submit.prevent="start">
    <h1 class="title">Hasil Permainan</h1>
    <hr class="hr">
    <game-result :results="result"></game-result>
  </form>
</template>

<script>
import GameResult from "../components/GameResult.vue";
import { Game } from "@/api";

export default {
  components: { GameResult },
  props: {
    game_id: String
  },
  data() {
    return {
      result: undefined
    };
  },
  mounted() {
    Game.getGame(this.game_id).then(game => {
      this.result = game.result
    })
  }
};
</script>

<style>
</style>
