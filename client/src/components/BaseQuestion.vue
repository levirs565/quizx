<template>
  <v-card>
    <v-card-title class="text-overline">Question {{ index + 1 }}</v-card-title>
    <v-card-text>
      <slot name="question" />

      <v-radio-group
        v-if="question.type === 'multiple-choice'"
        v-model="lazyAnswer"
        :readonly="!answerEditable"
        v-bind="inputProps"
      >
        <v-row
          v-for="(entry, choiceIndex) in question.choices"
          :key="choiceIndex"
          no-gutters
          class="question-choice"
        >
          <v-radio :value="choiceIndex" class="question-radio">
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
        outlined
        :readonly="!answerEditable"
        v-bind="inputProps"
      />
      <v-text-field
        v-else-if="question.type == 'number'"
        type="number"
        v-model.number="lazyAnswer"
        outlined
        :readonly="!answerEditable"
        v-bind="inputProps"
      />
      <math-field-input
        v-else-if="question.type == 'math'"
        outlined
        v-model="lazyAnswer"
        virtual-keyboard-mode="manual"
        :readonly="!answerEditable"
        v-bind="inputProps"
      />

      <slot name="content" />
    </v-card-text>

    <slot v-bind:component="this"></slot>
  </v-card>
</template>

<script>
import { getChoiceIndex } from "@/utils";
import MathFieldInput from "@/components/MathFieldInput.vue";

export default {
  props: {
    question: Object,
    answer: [Number, String],
    index: Number,
    answerEditable: {
      type: Boolean,
      default: true,
    },
    inputProps: Object,
  },
  components: {
    MathFieldInput,
  },
  data() {
    return {
      lazyAnswer: this.answer,
    };
  },
  watch: {
    lazyAnswer(value) {
      this.$emit("update:answer", value);
    },
    answer(value) {
      this.lazyAnswer = value;
    },
  },
  methods: {
    getChoiceIndex,
  },
};
</script>

<style scoped>
.question-radio >>> div {
  align-self: baseline !important;
}
.question-radio >>> label {
  align-items: baseline !important;
}
.question-choice {
  align-items: baseline !important;
}
</style>
