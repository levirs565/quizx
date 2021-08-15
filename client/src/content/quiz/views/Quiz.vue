<template>
  <div class="container p-4">
    <quiz-summary :quiz="quiz">
      <c-button type="primary">Play</c-button>
      <router-link
        v-if="$store.state.core.user.id == quiz.userId"
        :to="`/quiz/${quiz_id}/edit`"
        v-slot="{ navigate, href }"
      >
        <c-button :href="href" @click="navigate">Edit</c-button>
      </router-link>
    </quiz-summary>

    <p class="font-medium text-headline6 font-roboto my-4">Questions</p>

    <ul>
      <li v-for="(question, index) in quiz.questions" :key="question.id">
        <question
          class="my-2"
          :index="index"
          :question="question"
          @answer="checkAnswer"
        >
        </question>
      </li>
    </ul>
  </div>
</template>

<script>
import Question from "../components/Question";
import { Quiz } from "@/api.js";
import QuizSummary from "../components/QuizSummary.vue";

export default {
  components: {
    Question,
    QuizSummary,
  },
  props: {
    quiz_id: String,
  },
  data() {
    return {
      answerResults: {},
      quiz: {
        title: "undefined",
        questions: [],
      },
    };
  },
  mounted() {
    this.updateQuiz();
  },
  watch: {
    quiz_id() {
      this.updateQuiz();
    },
  },
  methods: {
    updateQuiz() {
      Quiz.getQuiz(this.quiz_id).then((val) => {
        this.quiz = val;
      });
    },
    checkAnswer(questionComponent) {
      const id = questionComponent.question.id;
      const answer = questionComponent.answer;
      Quiz.checkQuestionAnswer(this.quiz_id, id, answer).then((val) => {
        questionComponent.answerResult = val;
      });
    },
  },
};
</script>

<style></style>
