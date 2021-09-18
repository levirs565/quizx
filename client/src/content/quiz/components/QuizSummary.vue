<template>
  <c-card class="quiz-summary items-center">
    <c-card-overline class="w-full">Quiz</c-card-overline>

    <p v-if="!editor" class="w-full leading-none text-headline5">
      {{ quiz.title }}
    </p>
    <c-text-input v-else class="flex-grow mr-2" v-model="quiz.title" />
    <quiz-information
      :userId="quiz.userId"
      :questionCount="quiz.questions.length"
      class="w-full mt-2"
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
import CTextInput from "@/components/CTextInput.vue";

export default {
  components: {
    CCard,
    CCardOverline,
    CCardButtons,
    QuizInformation,
    CTextInput,
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
<style scoped>
/* .quiz-summary >>> * {
  @apply leading-none;
}

.quiz-summary >>> .material-icons {
  @apply text-base leading-none mr-2;
} */
</style>
