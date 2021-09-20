<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Game</p>
      </header>

      <div class="card-content">
        <p class="leading-none text-headline5 mb-2">
          {{ game.quizTitle }}
        </p>

        <table class="text-body2 table-auto game-result-table">
          <tr>
            <td>Score</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Correct</td>
            <td>{{ game.result.correct }}</td>
          </tr>
          <tr>
            <td>Wrong</td>
            <td>{{ game.result.wrong }}</td>
          </tr>
          <tr>
            <td>Unanswered</td>
            <td>{{ game.result.notAnswered }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Game } from "@/api";

export default {
  props: {
    game_id: String,
  },
  data() {
    return {
      game: undefined,
    };
  },
  mounted() {
    Game.getGame(this.game_id).then((game) => {
      this.game = game;
    });
  },
};
</script>

<style scoped>
.game-result-table >>> tr > td + td {
  @apply pl-4;
}
</style>
