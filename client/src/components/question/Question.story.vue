<template>
  <Story>
    <Variant title="Multiple Choice" :init-state="initMultipleChoice">
      <template #default="{ state }">
        <Question :question="state.question" :index="1" />
      </template>
      <template #controls="{ state }">
        <HstTextarea v-model="state.question.question" title="Question" />
        <HstTextarea
          v-for="(choice, index) in state.question.choices"
          :title="`Choice ${index}`"
          :modelValue="choice"
          @update:modelValue="state.question.choices[index] = $event"
        />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import Question from "./Question.vue";
function initMultipleChoice() {
  return {
    question: {
      type: "multiple-choice",
      question: "Soal Standar",
      choices: ["Pilihan 1", "Pilihan 2", "Pilihan 3", "Pilihan 4"],
    },
  };
}
</script>
