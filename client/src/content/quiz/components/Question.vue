<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Question {{ index }}</p>
    </header>
    <div class="card-content">
      <markdown-viewer :value="question.question" />

      <template v-if="question.type === 'multiple-choice'">
        <b-field
          v-for="(entry, choiceIndex) in question.choices"
          :key="choiceIndex"
        >
          <b-radio
            v-model="answer"
            :native-value="choiceIndex"
            type="is-success"
          >
            <markdown-viewer :value="entry" />
          </b-radio>
        </b-field>
      </template>
      <b-field v-else-if="question.type == 'short-text'">
        <b-input v-model="answer" type="text" />
      </b-field>
      <b-field v-else-if="question.type == 'number'">
        <b-numberinput :controls="false" v-model="answer" />
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
import MarkdownViewer from "@/markdown/MarkdownViewer.vue";

export default {
  props: {
    question: Object,
    initialAnswer: [Number, String],
    index: Number,
  },
  components: {
    MarkdownViewer,
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
