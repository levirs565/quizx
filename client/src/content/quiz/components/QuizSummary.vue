<template>
  <v-card>
    <v-card-title v-if="!editor">{{ quiz.title }}</v-card-title>
    <b-field v-else>
      <b-input v-model="quiz.title" />
    </b-field>
    <v-card-text>
      <quiz-information
        :userId="quiz.userId"
        :questionCount="quiz.questions.length"
      ></quiz-information>
    </v-card-text>
    <slot></slot>
  </v-card>
</template>
<script>
import QuizInformation from "@/content/components/QuizInformation.vue";

export default {
  components: {
    QuizInformation,
  },
  props: {
    quiz: Object,
    editor: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped></style>
