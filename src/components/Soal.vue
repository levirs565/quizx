<template>
  <form class="soal columns is-multiline">
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
    <input
      class="button is-primary"
      type="button"
      :value="teksSubmit"
      :disabled="pilihanTerpilih < 0"
      @click="buttonClick"
    >
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
      this.$emit("change", this);
    }
  }
};
</script>

<style>
.linebreak {
  width: 100%;
  height: 0;
  display: block;
}

input.button {
  align-self: flex-end;
  margin-left: auto;
}
</style>
