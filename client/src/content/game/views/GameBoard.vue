<template>
  <div class="container p-4">
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
        >
        </question>
      </li>
    </ul>

    <c-button @click="showFinishDialog" type="danger" class="mt-4 block ml-auto"
      >Finish</c-button
    >
  </div>
</template>

<script>
import { Game } from "@/api.js";
import Question from "../../quiz/components/Question.vue";
import showModal from "@/content/modal/bus";
import DialogFinishGame from "../components/DialogFinishGame.vue";

export default {
  components: {
    Question,
  },
  props: {
    game_id: String,
  },
  data() {
    return {
      game: {},
      lastQuestionResult: 0,
      questions: [],
    };
  },
  methods: {
    answerChanged(data) {
      let answer = data.answer;
      let id = data.question.id;
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
  },
  mounted() {
    this.updateState();
  },
};
</script>

<style></style>
