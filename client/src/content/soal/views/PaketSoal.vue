<template>
  <div class="container">
    <div class="box mb-8">
      <h1 class="title" v-text="paket.name"></h1>
      <p class="subtext">{{ paket.soalList.length }} Soal</p>
      <hr class="hr" />

      <div v-if="$store.state.core.user" class="mb-2">
        <router-link
          :to="`/permainan/config?id=${paket_id}`"
          class="button primary"
        >
          <font-awesome icon="play"></font-awesome>
          <span>Mainkan</span>
        </router-link>
      </div>
    </div>

    <ul>
      <li
        v-for="soal in paket.soalList"
        :key="soal.id"
      >
        <soal class="box my-4" :soal="soal" @submit="checkAnswer" v-slot="props">
          <button 
            v-show="props.answer > -1" 
            type="button" 
            class="button primary mt-4"
            @click="checkAnswer(props.quiz, props.answer)">
            Check Answer
          </button>
          <span v-if="answerResults[props.quiz.id]"
            class="ml-4"
            :class="answerResults[props.quiz.id].benar ? 'text-green-600' : 'text-red-600'">
            Jawaban anda {{ answerResults[props.quiz.id].benar ? "benar" : "salah coba lagi." }}
          </span>
        </soal>
      </li>
    </ul>
  </div>
</template>

<script>
import Soal from "../components/Soal";
import { Soal as SoalApi } from "@/api.js";

export default {
  components: {
    Soal
  },
  props: {
    paket_id: String
  },
  data() {
    return {
      answerResults: {},
      paket: {
        name: "undefined",
        soalList: []
      }
    };
  },
  mounted() {
    this.updatePaket();
  },
  watch: {
    paket_id() {
      this.updatePaket();
    }
  },
  methods: {
    updatePaket() {
      SoalApi.getPaket(this.paket_id).then(val => {
        this.paket = val;
      });
    },
    checkAnswer(quiz, answer) {
      SoalApi.postJawaban(this.paket_id, quiz.id, answer).then(val => {
        this.$set(this.answerResults, quiz.id, val)
      })
    }
  }
};
</script>

<style>
</style>
