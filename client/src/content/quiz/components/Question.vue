<template>
  <form>
    <p v-html="question.soal"></p>
    <label v-for="(entry, index) in question.pilihan" :key="index" class="block">
      <input
        type="radio"
        name="choices"
        :value="index"
        v-model="answer"
        @click="radioClicked"
      />
      <p class="inline-block ml-2" v-html="entry"></p>
    </label>
    <slot v-bind:answer="answer" v-bind:question="question"></slot>
  </form>
</template>

<script>
export default {
  props: {
    question: Object,
    initialAnswer: {
      type: Number,
      default: -1,
    },
    radioEnabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      answer: this.initialAnswer
    }
  },
  methods: {
    radioClicked(e) {
      if (!this.radioEnabled)
        e.preventDefault()
    }
  },
  watch: {
    answer() {
      this.$emit("change", this)
    }
  }
};
</script>

<style scoped>
</style>
