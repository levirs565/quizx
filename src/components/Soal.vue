<template>
  <form class="soal columns is-mobile is-multiline">
    <div class="is-block">
      <p v-text="soal.soal"></p>
      <template v-for="(entry, index) in soal.pilihan">
        <label :key="index" class="radio">
          <input type="radio" name="pilihan" :value="index" v-model="pilihanTerpilih">
          {{ entry }}
        </label>
        <br :key="index + 'br'">
      </template>
    </div>
    <div class="linebreak"></div>
    <br>
    <button
      class="button is-primary"
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
.button {
  align-self: flex-end;
  margin-left: auto;
}
</style>
