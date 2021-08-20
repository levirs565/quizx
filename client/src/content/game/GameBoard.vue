<template>
  <div>
    <modal></modal>
    <c-app-bar></c-app-bar>
    <nav class="fixed left-4 mt-7 top-1/2 transform -translate-y-1/2">
      <c-card class="w-72">
        <jumper
          :buttons="jumperButtons"
          class="w-full"
          @click="goToQuestion"
        ></jumper>
      </c-card>
    </nav>
    <div class="ml-80 mt-14">
      <div class="container " ref="container">
        <h1 class="fonts-roboto text-headline5 mb-4">{{ game.quizTitle }}</h1>

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

        <c-button
          @click="showFinishDialog"
          type="danger"
          class="mt-4 block ml-auto"
          >Finish</c-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Game } from "@/api.js";
import Question from "../quiz/components/Question.vue";
import showModal from "@/content/modal/bus";
import DialogFinishGame from "./components/DialogFinishGame.vue";
import CAppBar from "@/components/CAppBar.vue";
import Modal from "@/content/modal/Modal.vue";
import Jumper from "./components/Jumper.vue";
import CCard from "@/components/card/CCard.vue";

export default {
  components: {
    Question,
    CAppBar,
    Modal,
    Jumper,
    CCard,
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
      this.$set(this.jumperButtons, data.index, "primary");
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
            if (question.answer != -1) return "primary";
            return "";
          });
        });
    },
    showFinishDialog() {
      showModal(DialogFinishGame, {}, this.finish);
    },
    finish() {
      Game.finishGame(this.game_id).then(() => {
        this.$router.replace(`/permainan/${this.game_id}/`);
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
