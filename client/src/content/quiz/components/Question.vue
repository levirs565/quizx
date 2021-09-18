<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Question {{ index }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <p v-html="question.question"></p>
      </div>

      <b-field
        v-for="(entry, choiceIndex) in question.choices"
        :key="choiceIndex"
      >
        <b-radio v-model="answer" :native-value="choiceIndex" type="is-success">
          <p v-html="entry"></p>
        </b-radio>
      </b-field>
    </div>

    <footer class="card-footer level">
      <div class="card-footer-item level-left buttons">
        <slot v-bind:component="this"></slot>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    initialAnswer: {
      type: Number,
      default: -1,
    },
    index: Number,
  },
  data() {
    return {
      answer: this.initialAnswer,
      extraData: {},
    };
  },
  methods: {},
  watch: {
    answer() {
      this.$emit("answerChanged", this);
    },
  },
};
</script>

<style scoped></style>
