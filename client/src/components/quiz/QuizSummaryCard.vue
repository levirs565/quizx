<template>
  <v-card :to="to">
    <v-card-title>{{ quiz.title }}</v-card-title>
    <v-card-text>
      <quiz-information
        :userId="quiz.userId"
        :questionCount="quiz.questionCount"
        class="mb-1"
      />
      <v-chip-group column>
        <v-chip v-for="tag in quiz.tags" :key="tag">{{ tag }}</v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { QuizSummary } from "@quizx/shared";
import QuizInformation from "../quiz/QuizInformation.vue";

export interface Props {
  quiz: QuizSummary;
  to: string;
}

const props = defineProps<Props>();
</script>
