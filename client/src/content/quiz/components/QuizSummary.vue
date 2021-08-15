<template>
  <c-card class="quiz-summary items-center">
    <c-card-overline>Quiz</c-card-overline>

    <p class="w-full leading-none text-headline5 mb-2">{{ quiz.title }}</p>
    <quiz-information
      :userId="quiz.userId"
      :questionCount="quiz.questions.length"
      class="w-full"
    ></quiz-information>

    <c-card-buttons>
      <slot></slot>
    </c-card-buttons>
  </c-card>
</template>
<script>
import CCard from "@/components/card/CCard.vue";
import CCardOverline from "@/components/card/CCardOverline.vue";
import CCardButtons from "@/components/card/CCardButtons.vue";
import QuizInformation from "@/content/components/QuizInformation.vue";

export default {
  components: { CCard, CCardOverline, CCardButtons, QuizInformation },
  props: {
    quiz: Object,
  },
};
</script>
<style scoped>
/* .quiz-summary >>> * {
  @apply leading-none;
}

.quiz-summary >>> .material-icons {
  @apply text-base leading-none mr-2;
} */
</style>
