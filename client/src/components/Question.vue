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

    <template v-slot:content>
      <slot name="content" />
    </template>

    <slot v-bind:component="this"></slot>
  </base-question>
</template>

<script>
import TextEditor from "@/components/tiptap/TextViewer.vue";
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
    answerState: Number,
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
      const baseText = "Your answer is ";
      if (this.answerState == 0) {
        return {
          "success-messages": `${baseText} correct`,
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
