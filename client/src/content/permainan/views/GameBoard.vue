<template>
  <div class="box container">
    <div>
      <button @click="stop()" class="button danger w-full mb-2">
        Hentikan Permainan
      </button>
      <jumper
        :total="permainanState.soalCount"
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
            v-if="permainanState.interaktif"
            v-show="lastJawabanState > 0"
            class="mb-4 text-white font-semibold p-4"
            :class="lastJawabanState == 2 ? 'bg-green-500' : 'bg-red-500'"
          >
            Jawaban anda {{ lastJawabanState == 2 ? "benar" : "salah coba lagi." }}
          </p>
        </question>
      </li>
    </ul>
  </div>
</template>

<script>
import { Permainan } from "@/api.js";
import Question from "../../quiz/components/Question.vue";
import Jumper from "../components/Jumper.vue";

export default {
  components: {
    Question,
    Jumper
  },
  data() {
    return {
      permainanStarted: false,
      permainanState: {
        interaktif: false,
        soalCount: 0,
        jawabanCount: 0
      },
      lastJawabanState: 0,
      questions: []
    };
  },
  methods: {
    answerChanged(data) {
      let answer = data.answer;
      let id = data.question.id;
      Permainan.putJawaban(id, answer).then(val => {
        if (this.permainanState.interaktif) {
          // TODO: Untuk permainan interaktif
          // Contoh khan academeny
          // Hanya 2 Soal saja yang tampil
          this.lastJawabanState = val.benar ? 2 : 1;
          setTimeout(() => {
            this.lastJawabanState = 0;
            if (val.benar) {
              // TODO: seperti di tatas
              this.nextSoal();
            }
          }, 1000);
        }       
      });
    },
    updateState() {
      Permainan.state().then(val => {
        this.permainanStarted = val.permainanStarted;

        if (this.permainanStarted) {
          this.permainanState = val.permainan;
          return Permainan.getAllQuiz();
        }
        
        return Promise.resolve([])
      }).then(val => {
        this.questions = val
      });
    },
    stop() {
      Permainan.stopPermainan().then(val => {
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
