<template>
  <div class="card block">
    <header class="card-header">
      <p class="card-header-title">Quiz</p>
    </header>

    <div class="card-content">
      <p v-if="!editor" class="title">
        {{ quiz.title }}
      </p>
      <b-field v-else>
        <b-input v-model="quiz.title" />
      </b-field>
      <quiz-information
        :userId="quiz.userId"
        :questionCount="quiz.questions.length"
      ></quiz-information>
    </div>
  </div>
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
