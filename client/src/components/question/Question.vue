<template>
  <v-lazy min-height="200px">
    <v-card>
      <v-card-title class="text-overline"
        >Question {{ index + 1 }}</v-card-title
      >
      <v-card-text>
        <text-viewer :model-value="question.question" />

        <question-answer
          :question="question"
          :editable="editable"
          v-model:selectedAnswer="answer"
          :inputProps="answerInputProps"
        >
          <template v-slot:choice="{ choice, indexChar }">
            <span class="mr-2 text--primary">{{ indexChar }}.</span>
            <text-viewer :model-value="choice" />
          </template>
        </question-answer>

        <slot name="content" />
      </v-card-text>

      <slot v-bind:component="this"></slot>
    </v-card>
  </v-lazy>
</template>

<script>
import TextViewer from "@/components/tiptap/TextViewer.vue";
import QuestionAnswer from "./QuestionAnswer.vue";

export default {
  props: {
    question: Object,
    initialAnswer: [Number, String],
    index: Number,
    editable: {
      type: Boolean,
      default: true,
    },
    answerState: Number,
  },
  components: {
    TextViewer,
    QuestionAnswer,
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
    question() {
      this.answer = this.initialAnswer;
    },
  },
  computed: {
    answerInputProps() {
      const baseText = "Your answer is ";
      if (this.answerState == 0) {
        return {
          messages: `${baseText} correct`,
        };
      }

      if (this.answerState == 1) {
        return {
          "error-messages": `${baseText} wrong`,
        };
      }

      if (this.answerState == 2) {
        return {
          messages: "Unanswered",
        };
      }

      return {};
    },
  },
};
</script>

<style scoped></style>
