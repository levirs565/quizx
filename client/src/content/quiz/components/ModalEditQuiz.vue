<template>
  <form class="box form" @submit.prevent="$emit('submit', quizName)">
    <p class="title">Ubah Nama Paket</p>
    <hr class="hr">

    <div class="field">
      <label>Nama Paket</label>
      <input class="input" type="text" v-model="quizName">
    </div>

    <input
      class="button primary submit"
      type="submit"
      value="Ubah"
      :disabled="quizName.length == 0"
    >
  </form>
</template>

<script>
export default {
  props: {
    currentName: String
  },
  data() {
    return {
      quizName: this.currentName
    };
  }
};
</script>

<style>
</style>
