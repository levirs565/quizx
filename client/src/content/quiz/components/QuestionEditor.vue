<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Question {{ index + 1 }}</p>
    </header>
    <div class="card-content">
      <markdown-editor v-model="question.question" />

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
    };
  },
  methods: {
    onChoiceInput(index, value) {
      this.$set(this.question.choices, index, value);
    },
  },
};
</script>

<style scoped>
.choice-editor {
  width: 100%;
}
</style>
