<template>
  <div class="container mb-20">
    <quiz-summary :quiz="quiz" editor @rename="renameQuiz">
      <c-button type="danger" @click="showDeleteQuizDialog"
        >Delete Quiz</c-button
      >
    </quiz-summary>

    <p class="page-title2">Questions</p>

    <ul>
      <li
        v-for="(question, index) in quiz.questions"
        :key="question.id"
        class="mb-2"
      >
        <question-editor
          :index="index"
          :question="question"
          @save="saveQuestion"
          @delete="deleteQuestion"
        />
      </li>
    </ul>

    <c-fab class="fixed right-4 bottom-4" @click="newQuestion">
      <c-icon>add</c-icon>
    </c-fab>
  </div>
</template>

<script>
import { Quiz } from "@/api";
import showModal from "@/content/modal/bus";
import QuestionEditor from "../components/QuestionEditor.vue";
import QuizSummary from "../components/QuizSummary.vue";
import CFab from "@/components/CFab.vue";
import DialogDeleteQuiz from "../components/DialogDeleteQuiz.vue";

export default {
  props: {
    quiz_id: String,
  },
  components: {
    QuestionEditor,
    QuizSummary,
    CFab,
  },
  data() {
    return {
      quiz: {},
    };
  },
  methods: {
    refresh() {
      Quiz.getQuizForEditor(this.quiz_id).then((val) => {
        this.quiz = val;
      });
    },
    showDeleteQuizDialog() {
      showModal(DialogDeleteQuiz, {}, this.deleteQuiz);
    },
    deleteQuiz() {
      Quiz.deleteQuiz(this.quiz_id).then(() => {
        this.$router.replace("/quiz");
      });
    },
    renameQuiz(title) {
      Quiz.renameQuizTitle(this.quiz_id, { title }).then(() => {
        this.quiz.title = title;
      });
    },
    newQuestion() {
      this.quiz.questions.push({
        id: "new",
        question: "",
        choices: ["", "", "", ""],
        answer: 0,
      });
    },
    async saveQuestion(index, question) {
      let result;
      if (question.id == "new") {
        const newQuestion = {
          ...question,
          id: undefined,
        };
        result = await Quiz.addQuestion(this.quiz_id, newQuestion);
        this.$set(this.quiz.questions, index, result);
      } else {
        result = await Quiz.editQuestion(this.quiz_id, question.id, question);
      }
    },
    async deleteQuestion(index, question) {
      await Quiz.deleteQuestion(this.quiz_id, question.id);
      this.$delete(this.quiz.questions, index);
    },
  },
  watch: {
    quiz_id() {
      this.refresh();
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>
