<template>
  <div>
    <div>
      <h1 class="title inline-block">
        {{ quiz.name }}
        <font-awesome
          icon="edit"
          class="ml-2 cursor-pointer"
          @click="showEditQuiz"
        ></font-awesome>
      </h1>
      <button class="button danger float-right" @click="deletePaket">Hapus</button>
    </div>
    <hr class="hr" />
    <ul>
      <li v-for="(question, index) in quiz.soalList"
          :key="question.id">
        <question-admin :index="index" :question="question" @save="saveQuestion" @delete="deleteQuestion"/>
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
import { QuizAdmin } from "@/api";
import ModalEditQuiz from "../components/ModalEditQuiz";
import QuestionAdmin from "../components/QuestionAdmin.vue";
import showModal from "@/admin/modal/bus";

export default {
  props: {
    quiz_id: String
  },
  components: {
    QuestionAdmin
  },
  data() {
    return {
      quiz: {}
    };
  },
  methods: {
    refresh() {
      QuizAdmin.getQuiz(this.quiz_id).then(val => {
        this.quiz = val;
      });
    },
    deletePaket() {
      QuizAdmin.removeQuiz(this.quiz_id).then(() => {
        this.$router.replace("/admin/soal");
      });
    },
    showEditQuiz() {
      showModal(
        ModalEditQuiz,
        { currentName: this.quiz.name },
        this.editQuiz
      );
    },
    editQuiz(name) {
      QuizAdmin.editQuiz(this.quiz_id, { name }).then(val => {
        this.quiz = val;
      });
    },
    newQuestion() {
      this.quiz.soalList.push({
        id: "new",
        soal: "",
        pilihan: ["", "", "", ""],
        jawaban: 0
      })
    },
    async saveQuestion(index, question, finish) {
      let result;
      if (question.id == "new") {
        result = await QuizAdmin.createQuestion(this.quiz_id, question)
      } else {
        result = await QuizAdmin.editQuestion(this.quiz_id, question.id, question)
      }
      this.$set(this.quiz.soalList, index, result)
      finish()
    },
    async deleteQuestion(index, question, finish) {
      await QuizAdmin.removeQuestion(this.quiz_id, question.id)
      this.$delete(this.quiz.soalList, index)
      // TODO: When id is not index dependent below code are redundant
      this.refresh()
      finish()
    }
  },
  computed: {
    quizURI() {
      return `/admin/soal/${this.quiz.id}`;
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
