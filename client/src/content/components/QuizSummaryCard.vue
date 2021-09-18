<template>
  <div class="card" @click="$emit('click', $event)">
    <div class="card-content">
      <p class="title is-6 mb-1">{{ quiz.title }}</p>
      <quiz-information
        :userId="quiz.userId"
        :questionCount="quiz.questionCount"
      ></quiz-information>
    </div>
  </div>
</template>

<script>
import QuizInformation from "./QuizInformation.vue";
export default {
  components: { QuizInformation },
  props: {
    quiz: Object,
  },
};
</script>
