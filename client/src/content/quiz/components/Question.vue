<template>
  <base-question
    :question="question"
    :answer.sync="answer"
    :index="index"
    :answerEditable="editable"
    :inputProps="inputProps"
  >
    <template v-slot:question>
      <text-editor :value="question.question" :editable="false" />
    </template>

    <template v-slot:choice="{ choice, indexChar }">
      <span class="mr-2 text--primary">{{ indexChar }}.</span>
      <text-editor :value="choice" :editable="false" />
    </template>

    <slot v-bind:component="this"></slot>
  </base-question>
</template>

<script>
import TextEditor from "@/components/TextViewer.vue";
import BaseQuestion from "./BaseQuestion.vue";

export default {
  props: {
    question: Object,
    initialAnswer: [Number, String],
    index: Number,
    editable: {
      type: Boolean,
      default: true,
    },
    answerResult: Object,
  },
  components: {
    TextEditor,
    BaseQuestion,
  },
  data() {
    return {
      answer: this.initialAnswer,
    };
  },
  watch: {
    answer(value) {
      this.$emit("answerChanged", {
        question: this.question,
        index: this.index,
        answer: value,
      });
    },
  },
  computed: {
    inputProps() {
      if (!this.answerResult) return {};

      const baseText = "Your answer is ";
      if (this.answerResult.correct) {
        return {
          "success-messages": `${baseText} correct`,
        };
      }

      return {
        "error-messages": `${baseText} wrong`,
      };
    },
  },
};
</script>

<style scoped>
.question-choice-index {
  vertical-align: top;
}
.question-radio-label {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.question-radio > div {
  align-self: baseline !important;
}
.question-radio > label {
  align-items: baseline !important;
}
</style>
