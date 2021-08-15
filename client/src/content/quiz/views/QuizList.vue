<template>
  <div class="container p-4">
    <h1 class="fonts-roboto text-headline5 mb-4">My Quiz</h1>

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

    <c-fab class="absolute right-4 bottom-4" @click="showCreateQuiz">
      <c-icon>add</c-icon>
    </c-fab>
  </div>
</template>

<script>
import { Quiz } from "@/api.js";
import QuizSummaryCard from "@/content/components/QuizSummaryCard.vue";
import CFab from "@/components/CFab.vue";
import ModalNewQuiz from "../components/ModalNewQuiz.vue";
import showModal from "@/content/modal/bus";

export default {
  components: {
    QuizSummaryCard,
    CFab,
  },
  data() {
    return {
      quizList: [],
    };
  },
  methods: {
    showCreateQuiz() {
      showModal(ModalNewQuiz, {}, this.createQuiz);
    },
    async createQuiz(title) {
      const quiz = await Quiz.createQuiz({ title });
      this.$router.push(`/quiz/${quiz.id}`);
    },
  },
  mounted() {
    // Only show current user quiz
    Quiz.getQuizList().then((val) => {
      this.quizList = val.list;
    });
  },
};
</script>

<style></style>
