<template>
  <form>
    <p v-html="soal.soal"></p>
    <label v-for="(entry, index) in soal.pilihan" :key="index" class="block">
      <input
        type="radio"
        name="pilihan"
        :value="index"
        v-model="pilihanTerpilih"
      />
      <p class="inline-block ml-2" v-html="entry"></p>
    </label>
    <slot v-bind:answer="pilihanTerpilih" v-bind:quiz="soal"></slot>
  </form>
</template>

<script>
export default {
  props: {
    soal: Object
  },
  data() {
    return {
      pilihanTerpilih: -1
    }
  },
  watch: {
    pilihanTerpilih() {
      this.$emit("change", this)
    }
  }
};
</script>

<style scoped>
</style>
