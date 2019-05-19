<template>
  <form class="flex flex-col items-start">
    <p v-text="soal.soal"></p>
    <label v-for="(entry, index) in soal.pilihan" :key="index">
      <input type="radio" name="pilihan" :value="index" v-model="pilihanTerpilih">
      {{ entry }}
    </label>
    <div class="flex-grow"></div>
    <button
      class="button is-primary self-end"
      :class="{
        'is-loading': isLoading
      }"
      type="button"
      v-text="teksSubmit"
      :disabled="pilihanTerpilih < 0"
      @click="buttonClick"
    ></button>
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
    }
  },
  data() {
    return {
      pilihanTerpilih: -1,
      isLoading: false
    };
  },
  methods: {
    buttonClick() {
      this.$emit("submit", this);
    }
  },
  watch: {
    soal() {
      this.$emit("change", this);
    }
  }
};
</script>

<style scoped>
/* .button {
  align-self: flex-end;
  margin-left: auto;
} */
</style>
