<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Question {{ index + 1 }}</p>
    </header>
    <div class="card-content">
      <markdown-editor v-model="question.question" />

      <b-field grouped position="is-right">
        <b-select :value="question.type" @input="changeType">
          <option v-for="(title, id) in questionTypes" :key="id" :value="id">
            {{ title }}
          </option>
        </b-select>
      </b-field>

      <template v-if="question.type === 'multiple-choice'">
        <b-field
          v-for="(entry, choiceIndex) in question.choices"
          :key="choiceIndex"
        >
          <b-radio
            v-model="question.answer"
            :native-value="choiceIndex"
            type="is-success"
          />
          <markdown-editor
            class="choice-editor"
            :value="entry"
            @input="onChoiceInput(choiceIndex, $event)"
          ></markdown-editor>
        </b-field>
      </template>
      <b-field v-else-if="question.type == 'short-text'">
        <b-input v-model="question.answer" type="text" />
      </b-field>
      <b-field v-else-if="question.type == 'number'">
        <b-numberinput :controls="false" v-model="question.answer" />
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
import MarkdownEditor from "@/markdown/MarkdownEditor.vue";

export default {
  props: {
    question: Object,
    index: Number,
  },
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      answerResult: null,
      questionTypes: {
        "multiple-choice": "Multiple Choice",
        "short-text": "Short Text",
        number: "Number",
      },
    };
  },
  methods: {
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
