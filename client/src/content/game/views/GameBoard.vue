<template>
  <div class="page" style="--sidebar-width: 288px">
    <c-app-bar></c-app-bar>
    <nav class="sidebar-layout p-4">
      <div class="card">
        <div class="card-content">
          <jumper
            :buttons="jumperButtons"
            class="w-full"
            @click="goToQuestion"
          ></jumper>
        </div>
      </div>
    </nav>
    <div class="main-layout">
      <div class="container p-4" ref="container">
        <h1 class="title">{{ game.quizTitle }}</h1>

        <ul>
          <li
            v-for="(question, index) in questions"
            :key="question.id"
            class="mb-2"
          >
            <question
              :index="index"
              :question="question"
              :initialAnswer="question.answer"
              @answerChanged="answerChanged"
              ref="questions"
            >
            </question>
          </li>
        </ul>

        <b-button
          @click="showFinishDialog"
          type="is-danger"
          class="mt-4 block ml-auto"
          >Finish</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Game } from "@/api.js";
import Question from "../../quiz/components/Question.vue";
import CAppBar from "@/components/CAppBar.vue";
import Jumper from "../components/Jumper.vue";

export default {
  components: {
    Question,
    CAppBar,
    Jumper,
  },
  props: {
    game_id: String,
  },
  data() {
    return {
      game: {},
      lastQuestionResult: 0,
      questions: [],
      jumperButtons: [],
    };
  },
  methods: {
    answerChanged(data) {
      let answer = data.answer;
      let id = data.question.id;
      this.$set(this.jumperButtons, data.index, "is-primary");
      Game.putAnswer(this.game_id, id, answer).then((val) => {
        if (this.game.isInteractive) {
          // TODO: Untuk permainan interaktif
          // Contoh khan academeny
          // Hanya 2 Soal saja yang tampil
          this.lastQuestionResult = val.correct ? 2 : 1;
          setTimeout(() => {
            this.lastQuestionResult = 0;
            if (val.correct) {
              // TODO: seperti di tatas
              this.nextSoal();
            }
          }, 1000);
        }
      });
    },
    updateState() {
      Game.getGame(this.game_id)
        .then((val) => {
          this.game = val;

          if (this.game.isPlaying) {
            return Game.getAllQuestion(this.game_id);
          }

          return Promise.resolve([]);
        })
        .then((val) => {
          this.questions = val;
          this.jumperButtons = this.questions.map((question) => {
            if (question.answer != -1) return "is-primary";
            return "";
          });
        });
    },
    showFinishDialog() {
      this.$buefy.dialog.confirm({
        title: "Finish Game?",
        message: "Make sure all questions are answered correctly.",
        type: "is-danger",
        confirmText: "Finish",
        onConfirm: () => this.finish(),
      });
    },
    finish() {
      Game.finishGame(this.game_id).then(() => {
        this.$router.replace(`/game/${this.game_id}/`);
      });
    },
    getElementTop(el) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      return el.getBoundingClientRect().top + scrollY;
    },
    goToQuestion(index) {
      const element = this.$refs.questions[index].$el;
      const top =
        this.getElementTop(element) - this.getElementTop(this.$refs.container);
      window.scrollTo(0, top);
    },
  },
  mounted() {
    this.updateState();
  },
};
</script>

<style></style>
