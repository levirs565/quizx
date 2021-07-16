<template>
  <div class="box container">
    <div>
      <button @click="stop()" class="button danger w-full mb-2">
        Hentikan Permainan
      </button>
      <jumper
        :total="gameState.soalCount"
        :value="1"
      ></jumper>
    </div>
    <ul>
      <li v-for="question in questions" :key="question.id">
        <question
          :question="question"
          @change="answerChanged"
        >
          <p
            v-if="gameState.interaktif"
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
  data() {
    return {
      gameStarted: false,
      gameState: {
        interaktif: false,
        soalCount: 0,
        jawabanCount: 0
      },
      lastQuestionResult: 0,
      questions: []
    };
  },
  methods: {
    answerChanged(data) {
      let answer = data.answer;
      let id = data.question.id;
      Game.putAnswer(id, answer).then(val => {
        if (this.gameState.interaktif) {
          // TODO: Untuk permainan interaktif
          // Contoh khan academeny
          // Hanya 2 Soal saja yang tampil
          this.lastQuestionResult = val.benar ? 2 : 1;
          setTimeout(() => {
            this.lastQuestionResult = 0;
            if (val.benar) {
              // TODO: seperti di tatas
              this.nextSoal();
            }
          }, 1000);
        }       
      });
    },
    updateState() {
      Game.state().then(val => {
        this.gameStarted = val.permainanStarted;

        if (this.gameStarted) {
          this.gameState = val.permainan;
          return Game.getAllQuestion();
        }
        
        return Promise.resolve([])
      }).then(val => {
        this.questions = val
      });
    },
    stop() {
      Game.stopGame().then(val => {
        this.$store.commit("setPermainanResult", val);
        this.$router.push("/permainan/result");
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
