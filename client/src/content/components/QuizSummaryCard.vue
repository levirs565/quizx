<template>
  <div
    class="card h-16 py-0 flex flex-col justify-center font-roboto quiz-summary-card cursor-pointer"
    @click="$emit('click', $event)"
  >
    <p class="text-body1 leading-none  w-full">{{ quiz.title }}</p>
    <quiz-information
      :userId="quiz.userId"
      :questionCount="quiz.questionCount"
    ></quiz-information>
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
