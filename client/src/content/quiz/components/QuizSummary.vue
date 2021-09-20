<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Quiz</p>
    </header>

    <div class="card-content">
      <p v-if="!editor" class="title">
        {{ quiz.title }}
      </p>
      <b-field v-else>
        <b-input class="flex-grow mr-2" v-model="quiz.title" />
      </b-field>
      <quiz-information
        :userId="quiz.userId"
        :questionCount="quiz.questions.length"
        class="mt-2"
      ></quiz-information>
    </div>

    <footer class="card-footer level">
      <div class="card-footer-item level-left buttons">
        <slot></slot>
      </div>
    </footer>
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
