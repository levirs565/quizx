<template>
  <div class="container">
    <h1 class="page-title">Explore Quiz</h1>

    <ul>
      <router-link
        :to="`/quiz/${quiz.id}`"
        v-for="quiz in quizList"
        :key="quiz.id"
        tag="li"
        v-slot="{ navigate }"
        class="mb-2"
      >
        <quiz-summary-card :quiz="quiz" @click="navigate" />
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Quiz } from "@/api.js";
import QuizSummaryCard from "../../components/QuizSummaryCard.vue";

export default {
  components: {
    QuizSummaryCard,
  },
  data() {
    return {
      quizList: [],
    };
  },

  mounted() {
    Quiz.getQuizList().then((val) => {
      this.quizList = val.list;
    });
  },
};
</script>

<style></style>
