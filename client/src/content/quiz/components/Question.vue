<template>
  <form>
    <p v-html="question.soal"></p>
    <label v-for="(entry, index) in question.pilihan" :key="index" class="block">
      <input
        type="radio"
        name="choices"
        :value="index"
        v-model="answer"
      />
      <p class="inline-block ml-2" v-html="entry"></p>
    </label>
    <slot v-bind:answer="answer" v-bind:question="question"></slot>
  </form>
</template>

<script>
export default {
  props: {
    question: Object
  },
  data() {
    return {
      answer: -1
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
