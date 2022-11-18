<template>
  <v-radio-group
    v-if="question instanceof MultipleChoiceQuestion"
    :readonly="!editable"
    :model-value="selectedAnswer"
    :messages="message?.text"
    :error-messages="message?.error"
    @update:model-value="answerChanged"
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
    v-else-if="question instanceof ShortTextQuestion"
    :model-value="selectedAnswer"
    :messages="message?.text"
    :error-messages="message?.error"
    @update:model-value="answerChanged"
    type="text"
    variant="outlined"
    :readonly="!editable"
  />
  <v-text-field
    v-else-if="question instanceof NumberQuestion"
    :model-value="selectedAnswer"
    :messages="message?.text"
    :error-messages="message?.error"
    @update:model-value="answerChanged($event ? parseInt($event) : null)"
    type="number"
    variant="outlined"
    :readonly="!editable"
  />
  <math-field-input
    v-else-if="question instanceof MathQuestion"
    :model-value="selectedAnswer"
    :messages="message?.text"
    :error-messages="message?.error"
    @update:model-value="answerChanged"
    variant="outlined"
    virtual-keyboard-mode="manual"
    :readonly="!editable"
    :virtualKeyboardContainer="mathVirtualKeyboardContainer"
  />
</template>
<script lang="ts" setup>
import { getChoiceIndex } from "@/utils";
import MathFieldInput from "@/components/math/MathFieldInput.vue";
import {
  MathQuestion,
  MultipleChoiceQuestion,
  NumberQuestion,
  Question,
  QuestionAnswer,
  QuestionState,
  ShortTextQuestion,
} from "@quizx/shared";

export interface Message {
  text?: string;
  error?: string;
}

export interface Props {
  question: Question;
  selectedAnswer?: QuestionAnswer;
  editable: boolean;
  mathVirtualKeyboardContainer?: HTMLElement;
  message?: Message;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:selectedAnswer", value: QuestionAnswer): void;
}>();

const answerChanged = (value: QuestionAnswer) => {
  emit("update:selectedAnswer", value);
};
</script>
<style scoped>
.question-choice,
.question-radio,
.question-radio >>> label {
  align-items: baseline !important;
}
</style>
