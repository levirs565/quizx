<template>
  <form class="soal">
    <p v-text="soal"></p>
    <template v-for="(entry, index) in pilihan">
      <input
        type="radio"
        :id="'pilihan' + soalId +'|' + index"
        name="pilihan"
        :key="index + 'i'"
        :value="index"
      >
      <label :for="'pilihan' + soalId +'|' + index" :key="index + 'l'" v-text="entry"></label>
      <br :key="index + 'br'">
    </template>
    <input type="button" :value="teksSubmit">
  </form>
</template>

<script>
export default {
  props: {
    soal: String,
    pilihan: Array,
    teksSubmit: {
      type: String,
      default: "Check Jawaban"
    },
    soalId: Number
  }
};
</script>

<style>
</style>
