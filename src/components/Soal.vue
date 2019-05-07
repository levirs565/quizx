<template>
  <form class="soal">
    <p v-text="soal.soal"></p>
    <template v-for="(entry, index) in soal.pilihan">
      <input
        type="radio"
        :id="'pilihan' + soal.id +'|' + index"
        name="pilihan"
        :key="index + 'i'"
        :value="index"
        v-model="pilihanTerpilih"
      >
      <label :for="'pilihan' + soal.id +'|' + index" :key="index + 'l'" v-text="entry"></label>
      <br :key="index + 'br'">
    </template>
    <br>
    <input class="button is-primary" type="button" :value="teksSubmit" :disabled="pilihanTerpilih < 0" @click="buttonClick">
    <br>
  </form>
</template>

<script>
export default {
  props: {
    soal: Object,
    teksSubmit: {
      type: String,
      default: "Check Jawaban"
    },
  },
  data() {
    return {
      pilihanTerpilih: -1
    };
  },
  methods: {
    buttonClick() {
      this.$emit("submit", this);
    }
  },
  watch: {
    soal() {
      this.$emit('change', this);
    }
  }
};
</script>

<style>
</style>
