<template>
  <div class="container flex-col">
    <div>
      <h1 class="title inline-block">
        {{ quiz.title }}
        <font-awesome
          icon="edit"
          class="ml-2 cursor-pointer"
          @click="showEditQuiz"
        ></font-awesome>
      </h1>
      <button class="button danger float-right" @click="deleteQuiz">Hapus</button>
    </div>
    <hr class="hr" />
    <ul>
      <li v-for="(question, index) in quiz.questions"
          :key="question.id">
        <question-editor :index="index" :question="question" @save="saveQuestion" @delete="deleteQuestion"/>
      </li>
    </ul>
    <button
      class="button primary float-right"
      @click="newQuestion"
      >
      Soal Baru
    </button>
  </div>
</template>

<script>
import { Quiz } from "@/api";
import ModalEditQuiz from "../components/ModalEditQuiz";
import QuestionEditor from "../components/QuestionEditor.vue";
import showModal from "@/content/modal/bus";

export default {
  props: {
    quiz_id: String
  },
  components: {
    QuestionEditor
  },
  data() {
    return {
      quiz: {}
    };
  },
  methods: {
    refresh() {
      Quiz.getQuizForEditor(this.quiz_id).then(val => {
        this.quiz = val;
      });
    },
    deleteQuiz() {
      Quiz.deleteQuiz(this.quiz_id).then(() => {
        this.$router.replace("/quiz");
      });
    },
    showEditQuiz() {
      showModal(
        ModalEditQuiz,
        { currentName: this.quiz.title },
        this.renameQuiz
      );
    },
    renameQuiz(title) {
      Quiz.renameQuizTitle(this.quiz_id, { title }).then(() => {
        this.quiz.title = title
      });
    },
    newQuestion() {
      this.quiz.questions.push({
        id: "new",
        question: "",
        choices: ["", "", "", ""],
        answer: 0
      })
    },
    async saveQuestion(index, question, finish) {
      let result;
      if (question.id == "new") {
        const newQuestion = {
          ...question,
          id: undefined
        }
        result = await Quiz.addQuestion(this.quiz_id, newQuestion)
        this.$set(this.quiz.questions, index, result)
      } else {
        result = await Quiz.editQuestion(this.quiz_id, question.id, question)
      }
      finish()
    },
    async deleteQuestion(index, question, finish) {
      await Quiz.deleteQuestion(this.quiz_id, question.id)
      this.$delete(this.quiz.questions, index)
      // TODO: When id is not index dependent below code are redundant
      this.refresh()
      finish()
    }
  },
  computed: {
    quizURI() {
      return `/admin/quiz/${this.quiz.id}`;
    }
  },
  watch: {
    quiz_id() {
      this.refresh();
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style src="../styles/list.css" scoped>
</style>
<style lang="postcss" scoped>
.container {
  @apply flex;
}

.container > * {
  @apply flex-grow;
  min-width: calc(50% - 1rem);
}
</style>
