<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Question {{ index + 1 }}</p>
    </header>
    <div class="card-content">
      <b-field>
        <b-input
          expanded
          v-model="question.question"
          type="textarea"
          ref="questionInput"
        ></b-input>
      </b-field>

      <b-field
        v-for="(entry, choiceIndex) in question.choices"
        :key="choiceIndex"
      >
        <b-radio
          v-model="question.answer"
          :native-value="choiceIndex"
          type="is-success"
        />
        <b-input
          :value="entry"
          ref="choicesInput"
          expanded
          @input="updateChoice(choiceIndex, $event)"
          type="textarea"
        ></b-input>
      </b-field>
    </div>

    <footer class="card-footer level">
      <div class="card-footer-item level-left buttons"></div>
      <div class="card-footer-item level-right buttons">
        <b-button
          v-show="question.id != 'new'"
          icon-right="delete"
          @click="$emit('delete', index)"
        />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    index: Number,
  },
  data() {
    return {
      answerResult: null,
    };
  },
  methods: {
    expandInput(com) {
      const el = com.$el.getElementsByTagName("textarea")[0];
      el.style.height = "3rem";
      const height = el.offsetHeight - el.clientHeight + el.scrollHeight;
      el.style.height = height + "px";
    },
    updateChoice(index, text) {
      this.$set(this.question.choices, index, text);
      this.expandInput(this.$refs.choicesInput[index]);
    },
  },
  watch: {
    "question.question"() {
      this.expandInput(this.$refs.questionInput);
    },
  },
  mounted() {
    this.expandInput(this.$refs.questionInput);
    for (const com of this.$refs.choicesInput) {
      this.expandInput(com);
    }
  },
};
</script>

<style scoped></style>
