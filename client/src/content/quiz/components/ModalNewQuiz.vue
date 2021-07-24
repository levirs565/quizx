<template>
  <form class="box form" @submit.prevent="$emit('submit', quizName)">
    <p class="title">Paket Baru</p>
    <hr class="hr">

    <div class="field">
      <label>Nama Paket</label>
      <input class="input" type="text" v-model="quizName">
    </div>

    <input
      class="button primary submit"
      type="submit"
      value="Buat"
      :disabled="quizName.length == 0"
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      quizName: ""
    };
  }
};
</script>

<style>
</style>
