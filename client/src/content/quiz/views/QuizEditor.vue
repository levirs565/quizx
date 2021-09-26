<template>
  <div class="has-fab">
    <quiz-summary :quiz="quiz" editor>
      <b-button type="is-danger" @click="showDeleteQuizDialog"
        >Delete Quiz</b-button
      >
      <b-button type="is-primary" @click="saveQuiz">Save</b-button>
    </quiz-summary>

    <p class="subtitle">Questions</p>

    <ul>
      <li
        v-for="(question, index) in quiz.questions"
        :key="question.id"
        class="block"
      >
        <question-editor
          :index="index"
          :question="question"
          @update:question="$set(quiz.questions, index, $event)"
          @delete="deleteQuestion"
        />
      </li>
    </ul>

    <b-button
      size="is-medium"
      type="is-primary"
      class="is-fab"
      icon-right="plus"
      @click="newQuestion"
    />
  </div>
</template>

<script>
import { Quiz } from "@/api";
import QuestionEditor from "../components/QuestionEditor.vue";
import QuizSummary from "../components/QuizSummary.vue";

export default {
  props: {
    quiz_id: String,
  },
  components: {
    QuestionEditor,
    QuizSummary,
  },
  data() {
    return {
      quiz: {},
    };
  },
  methods: {
    refresh() {
      Quiz.getQuizForEditor(this.quiz_id)
        .then((val) => {
          this.quiz = val;
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: "Cannot load quiz for editing",
            type: "is-danger",
          });
        });
    },
    showDeleteQuizDialog() {
      this.$buefy.dialog.confirm({
        title: "Delete Quiz?",
        message: "This action is permanent.",
        type: "is-danger",
        confirmText: "Delete",
        onConfirm: () => this.deleteQuiz(),
      });
    },
    deleteQuiz() {
      Quiz.deleteQuiz(this.quiz_id).then(() => {
        this.$router.replace("/quiz");
      });
    },
    newQuestion() {
      this.quiz.questions.push({
        id:
          "new-" +
          Math.random()
            .toString(36)
            .substr(2),
        type: "multiple-choice",
        question: "",
        choices: ["", "", "", ""],
        answer: 0,
      });
    },
    async saveQuiz() {
      try {
        const result = await Quiz.saveQuiz(this.quiz_id, this.quiz);
        const newIdsMap = result.newQuestionsId;
        for (const question of this.quiz.questions) {
          if (question.id in newIdsMap) {
            question.id = newIdsMap[question.id];
          }
        }
        this.$buefy.toast.open({
          message: "Quiz saved",
          type: "is-success",
        });
      } catch (e) {
        console.error(e);
        this.$buefy.toast.open({
          message: "Cannot save quiz",
          type: "is-danger",
        });
      }
    },
    async deleteQuestion(index) {
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
