<template>
  <div class="mb-14">
    <h1 class="title">My Quiz</h1>

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
      this.$buefy.dialog.prompt({
        title: "Create Quiz",
        message: "Title",
        trapFocus: true,
        confirmText: "Create",
        onConfirm: (title) => this.createQuiz(title),
      });
    },
    async createQuiz(title) {
      const quiz = await Quiz.createQuiz({ title });
      this.$router.push(`/quiz/${quiz.id}`);
    },
  },
  mounted() {
    // Only show current user quiz
    Quiz.getQuizList()
      .then((val) => {
        this.quizList = val.list;
      })
      .catch(() => {
        this.$buefy.toast.open({
          message: "Cannot load Quiz list",
          type: "is-danger",
        });
      });
  },
};
</script>

<style></style>
