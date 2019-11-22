<template>
  <form class="box form" action="none" @submit.prevent="start">
    <h1 class="title">Hasil Permainan</h1>
    <hr class="hr">
    <permainan-result :results="result"></permainan-result>
  </form>
</template>

<script>
import PermainanResult from "../components/PermainanResult.vue";

export default {
  components: { PermainanResult },
  data() {
    return {
      result: undefined
    };
  },
  mounted() {
    this.result = this.$store.state.permaiananResult;
    this.$store.commit("changePermainanResult", undefined);
  }
};
</script>

<style>
</style>
