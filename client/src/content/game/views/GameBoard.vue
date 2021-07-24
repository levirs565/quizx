<template>
  <div class="box container">
    <div>
      <button @click="stop()" class="button danger w-full mb-2">
        Hentikan Permainan
      </button>
      <jumper
        :total="questions.length"
        :value="1"
      ></jumper>
    </div>
    <ul>
      <li v-for="question in questions" :key="question.id">
        <question
          :question="question"
          :initialAnswer="question.answer"
          @change="answerChanged"
        >
          <p
            v-if="game.isInteractive"
            v-show="lastQuestionResult > 0"
            class="mb-4 text-white font-semibold p-4"
            :class="lastQuestionResult == 2 ? 'bg-green-500' : 'bg-red-500'"
          >
            Jawaban anda {{ lastQuestionResult == 2 ? "benar" : "salah coba lagi." }}
          </p>
        </question>
      </li>
    </ul>
  </div>
</template>

<script>
import { Game } from "@/api.js";
import Question from "../../quiz/components/Question.vue";
import Jumper from "../components/Jumper.vue";

export default {
  components: {
    Question,
    Jumper
  },
  props: {
    game_id: String
  },
  data() {
    return {
      game: {},
      lastQuestionResult: 0,
      questions: []
    };
  },
  methods: {
    answerChanged(data) {
      let answer = data.answer;
      let id = data.question.id;
      Game.putAnswer(this.game_id, id, answer).then(val => {
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
      Game.getGame(this.game_id).then(val => {
        this.game = val

        if (this.game.isPlaying) {
          return Game.getAllQuestion(this.game_id);
        }
        
        return Promise.resolve([])
      }).then(val => {
        this.questions = val
      });
    },
    stop() {
      Game.finishGame(this.game_id).then(() => {
        this.$router.push(`/permainan/${this.game_id}/`);
      });
    }
  },
  mounted() {
    this.updateState();
  }
};
</script>

<style>
</style>
