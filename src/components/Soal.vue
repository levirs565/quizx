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
        @input="radioInput"
      >
      <label :for="'pilihan' + soalId +'|' + index" :key="index + 'l'" v-text="entry"></label>
      <br :key="index + 'br'">
    </template>
    <input type="button" :value="teksSubmit" :disabled="!dapatDiSubmit">
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
  },
  data() {
    return {
      dapatDiSubmit: false
    };
  },
  methods: {
    radioInput() {
      this.dapatDiSubmit = true;
    }
  }
};
</script>

<style>
</style>
