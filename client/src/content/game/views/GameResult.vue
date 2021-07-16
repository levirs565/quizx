<template>
  <form class="box form" action="none" @submit.prevent="start">
    <h1 class="title">Hasil Permainan</h1>
    <hr class="hr">
    <game-result :results="result"></game-result>
  </form>
</template>

<script>
import GameResult from "../components/GameResult.vue";

export default {
  components: { GameResult },
  data() {
    return {
      result: undefined
    };
  },
  mounted() {
    this.result = this.$store.state.content.permaiananResult;
    this.$store.commit("setPermainanResult", undefined);
  }
};
</script>

<style>
</style>
