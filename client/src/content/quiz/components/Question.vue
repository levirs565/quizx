<template>
  <v-card>
    <v-card-title class="text-overline">Question {{ index + 1 }}</v-card-title>
    <v-card-text>
      <text-editor :value="question.question" :editable="false" />

      <v-radio-group
        v-if="question.type === 'multiple-choice'"
        v-model="answer"
        :readonly="!editable"
        v-bind="inputProps"
      >
        <v-radio
          v-for="(entry, choiceIndex) in question.choices"
          :key="choiceIndex"
          :value="choiceIndex"
          class="question-radio"
        >
          <template v-slot:label>
            <span class="mr-2 text--primary"
              >{{ getChoiceIndex(choiceIndex) }}.</span
            >
            <text-editor :value="entry" :editable="false" />
          </template>
        </v-radio>
      </v-radio-group>
      <v-text-field
        v-else-if="question.type == 'short-text'"
        v-model="answer"
        type="text"
        filled
        :readonly="!editable"
        v-bind="inputProps"
      />
      <v-text-field
        v-else-if="question.type == 'number'"
        type="number"
        v-model.number="answer"
        filled
        :readonly="!editable"
        v-bind="inputProps"
      />
      <math-field-input
        v-else-if="question.type == 'math'"
        filled
        v-model="answer"
        virtual-keyboard-mode="manual"
        :readonly="!editable"
        v-bind="inputProps"
      />
    </v-card-text>

    <slot v-bind:component="this"></slot>
  </v-card>
</template>

<script>
import TextEditor from "@/components/TextEditor.vue";
import { getChoiceIndex } from "@/content/utils";
import MathFieldInput from "@/components/MathFieldInput.vue";

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
    MathFieldInput,
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
