<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Question {{ index }}</p>
    </header>
    <div class="card-content">
      <text-editor class="field" :value="question.question" :editable="false" />

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
            <text-editor :value="entry" :editable="false" />
          </b-radio>
        </b-field>
      </template>
      <b-field v-else-if="question.type == 'short-text'">
        <b-input v-model="answer" type="text" />
      </b-field>
      <b-field v-else-if="question.type == 'number'">
        <b-numberinput :controls="false" v-model="answer" />
      </b-field>
      <math-field
        v-else-if="question.type == 'math'"
        bordered
        v-model="answer"
        virtual-keyboard-mode="manual"
      />
    </div>

    <footer class="card-footer level">
      <div class="card-footer-item level-left buttons">
        <slot v-bind:component="this"></slot>
      </div>
    </footer>
  </div>
</template>

<script>
import TextEditor from "@/components/TextEditor.vue";
import MathField from "@/components/MathField.vue";

export default {
  props: {
    question: Object,
    initialAnswer: [Number, String],
    index: Number,
  },
  components: {
    TextEditor,
    MathField,
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
