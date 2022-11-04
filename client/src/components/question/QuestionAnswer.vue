<template>
  <v-radio-group
    v-if="question.type === 'multiple-choice'"
    v-model="lazyAnswer"
    :readonly="!editable"
    v-bind="inputProps"
  >
    <v-row
      v-for="(entry, choiceIndex) in question.choices"
      :key="choiceIndex"
      no-gutters
      class="question-choice"
    >
      <v-radio :value="choiceIndex" class="question-radio" inline>
        <template v-slot:label>
          <slot
            name="choice"
            v-bind="{
              choice: entry,
              index: choiceIndex,
              indexChar: getChoiceIndex(choiceIndex),
            }"
          />
        </template>
      </v-radio>

      <slot
        name="afterChoice"
        v-bind="{
          choice: entry,
          index: choiceIndex,
          indexChar: getChoiceIndex(choiceIndex),
        }"
      />
    </v-row>
  </v-radio-group>
  <v-text-field
    v-else-if="question.type == 'short-text'"
    v-model="lazyAnswer"
    type="text"
    variant="outlined"
    :readonly="!editable"
    v-bind="inputProps"
  />
  <v-text-field
    v-else-if="question.type == 'number'"
    type="number"
    v-model.number="lazyAnswer"
    variant="outlined"
    :readonly="!editable"
    v-bind="inputProps"
  />
  <math-field-input
    v-else-if="question.type == 'math'"
    variant="outlined"
    v-model="lazyAnswer"
    virtual-keyboard-mode="manual"
    :readonly="!editable"
    v-bind="inputProps"
    :virtualKeyboardContainer="mathVirtualKeyboardContainer"
  />
</template>
<script>
import { getChoiceIndex } from "@/utils";
import MathFieldInput from "@/components/math/MathFieldInput.vue";

export default {
  components: {
    MathFieldInput,
  },
  props: {
    question: Object,
    selectedAnswer: [Number, String],
    editable: Boolean,
    inputProps: Object,
    mathVirtualKeyboardContainer: HTMLElement,
  },
  data() {
    return {
      lazyAnswer: this.selectedAnswer,
    };
  },
  watch: {
    lazyAnswer(value) {
      this.$emit("update:selectedAnswer", value);
    },
    selectedAnswer(value) {
      this.lazyAnswer = value;
    },
  },
  methods: {
    getChoiceIndex,
  },
};
</script>
<style scoped>
.question-choice,
.question-radio,
.question-radio >>> label {
  align-items: baseline !important;
}
</style>
