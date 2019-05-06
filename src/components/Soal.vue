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
        v-model="pilihanTerpilih"
      >
      <label :for="'pilihan' + soalId +'|' + index" :key="index + 'l'" v-text="entry"></label>
      <br :key="index + 'br'">
    </template>
    <br>
    <input type="button" :value="teksSubmit" :disabled="pilihanTerpilih < 0" @click="buttonClick">
    <br>
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
      pilihanTerpilih: -1
    };
  },
  methods: {
    buttonClick() {
      this.$emit("submit", this);
    }
  },
  watch: {
    soalId() {
      this.$emit('change', this);
    }
  }
};
</script>

<style>
</style>
