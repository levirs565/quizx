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
            class="question-radio"
            @click.native="handleRadioClick"
          >
            <span class="mr-2">{{ getChoiceIndex(choiceIndex) }}.</span>
            <text-editor :value="entry" :editable="false" />
          </b-radio>
        </b-field>
      </template>
      <b-field v-else-if="question.type == 'short-text'">
        <b-input v-model="answer" type="text" :readonly="!editable" />
      </b-field>
      <b-field v-else-if="question.type == 'number'">
        <b-numberinput
          :controls="false"
          v-model="answer"
          :editable="editable"
        />
      </b-field>
      <math-field
        v-else-if="question.type == 'math'"
        bordered
        v-model="answer"
        virtual-keyboard-mode="manual"
        :read-only="!editable"
      />
    </div>

    <slot v-bind:component="this"></slot>
  </div>
</template>

<script>
import TextEditor from "@/components/TextEditor.vue";
import MathField from "@/components/MathField.vue";
import { getChoiceIndex } from "@/content/utils";

export default {
  props: {
    question: Object,
    initialAnswer: [Number, String],
    index: Number,
    editable: {
      type: Boolean,
      default: true,
    },
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
  methods: {
    handleRadioClick(e) {
      if (this.editable) return;
      e.preventDefault();
    },
    getChoiceIndex,
  },
  watch: {
    answer() {
      this.$emit("answerChanged", this);
    },
  },
};
</script>

<style scoped>
.question-choice-index {
  vertical-align: top;
}
.question-radio >>> .control-label {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
</style>
