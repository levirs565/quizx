<template>
  <div class="container mb-14">
    <h1 class="page-title">My Quiz</h1>

    <ul class="mb-4">
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

    <c-fab class="fixed right-4 bottom-4" @click="showCreateQuiz">
      <b-icon icon="plus" />
    </c-fab>
  </div>
</template>

<script>
import { Quiz } from "@/api.js";
import QuizSummaryCard from "@/content/components/QuizSummaryCard.vue";
import CFab from "@/components/CFab.vue";
import ModalNewQuiz from "../components/DialogCreateQuiz.vue";
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
