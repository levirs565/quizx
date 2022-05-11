<template>
  <base-question
    :question="question"
    :index="index"
    :answer.sync="question.answer"
    answerEditable
  >
    <template v-slot:question>
      <text-editor-card
        v-model="question.question"
        @editorFocus="$emit('editorFocus', $event)"
      />
      <v-row no-gutters>
        <v-spacer />
        <v-select
          :value="question.type"
          :items="questionTypes"
          item-value="value"
          item-text="name"
          @input="changeType"
          filled
          class="my-2"
        />
      </v-row>
    </template>
    <template v-slot:afterChoice="{ choice, index, indexChar }">
      <span class="mr-2 text--primary">{{ indexChar }}.</span>
      <text-editor-card
        :value="choice"
        @input="onChoiceInput(index, $event)"
        class="flex-grow-1 mb-2"
        @editorFocus="$emit('editorFocus', $event)"
      />
      <v-btn icon class="ml-2" @click="removeChoice(index)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <template v-slot:content>
      <div
        v-if="question.type == 'multiple-choice'"
        @click="addChoice"
        class="d-flex justify-end"
      >
        <v-btn>Add Question</v-btn>
      </div>
    </template>
  </base-question>
</template>

<script>
import TextEditorCard from "@/components/tiptap/TextEditor.vue";
import BaseQuestion from "./BaseQuestion.vue";

export default {
  props: {
    question: Object,
    index: Number,
  },
  components: {
    TextEditorCard,
    BaseQuestion,
  },
  data() {
    return {
      answerResult: null,
      questionTypes: [
        {
          value: "multiple-choice",
          name: "Multiple Choice",
        },
        {
          value: "short-text",
          name: "Short Text",
        },
        { value: "number", name: "Number" },
        { value: "math", name: "Math" },
      ],
    };
  },
  methods: {
    addChoice() {
      this.question.choices.push("");
    },
    removeChoice(index) {
      this.$delete(this.question.choices, index);
    },
    onChoiceInput(index, value) {
      this.$set(this.question.choices, index, value);
    },
    changeType(type) {
      let newQuestion = {
        id: this.question.id,
        question: this.question.question,
        type,
      };
      if (type == "multiple-choice") {
        newQuestion = {
          ...newQuestion,
          choices: ["", "", "", ""],
          answer: 0,
        };
      } else if (type == "short-text") {
        newQuestion = {
          ...newQuestion,
          answer: "",
        };
      } else if (type == "number") {
        newQuestion = {
          ...newQuestion,
          answer: 0,
        };
      } else if (type == "math") {
        newQuestion = {
          ...newQuestion,
          answer: "",
        };
      }
      this.$emit("update:question", newQuestion);
    },
  },
};
</script>

<style scoped>
.choice-editor {
  width: 100%;
}
</style>
