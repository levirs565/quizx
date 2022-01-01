<template>
  <v-card :to="to">
    <v-card-title>{{ quiz.title }}</v-card-title>
    <v-card-text>
      <quiz-information
        :userId="quiz.userId"
        :questionCount="quiz.questionCount"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import QuizInformation from "./QuizInformation.vue";
export default {
  components: { QuizInformation },
  props: {
    quiz: Object,
    to: String
  },
};
</script>
