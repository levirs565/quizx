<template>
  <form class="flex flex-col">
    <p v-text="soal.soal"></p>
    <label v-for="(entry, index) in soal.pilihan" :key="index" class="block">
      <input
        type="radio"
        name="pilihan"
        :value="index"
        v-model="pilihanTerpilih"
      />
      {{ entry }}
    </label>
    <div class="flex-grow"></div>
    <slot></slot>
    <button
      class="button primary self-end"
      :class="{
        'is-loading': isLoading
      }"
      type="button"
      v-text="teksSubmit"
      :disabled="pilihanTerpilih < 0"
      @click="buttonClick"
    ></button>
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
</style>
