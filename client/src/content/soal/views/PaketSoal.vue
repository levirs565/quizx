<template>
  <div class="box container flex flex-col">
    <h1 class="title" v-text="paket.name"></h1>
    <p class="subtext">{{ paket.soalList.length }} Soal</p>
    <hr class="hr" />

    <div v-if="$store.state.core.user" class="mb-8">
      <router-link
        :to="`/permainan/config?id=${paket_id}`"
        class="button primary"
      >
        <font-awesome icon="play"></font-awesome>
        <span>Mainkan</span>
      </router-link>
    </div>

    <ul>
      <li
        v-for="soal in paket.soalList"
        :key="soal.id"
      >
        <soal :soal="soal" @submit="checkAnswer" v-slot="props">
          <button 
            v-show="props.answer > -1" 
            type="button" 
            class="button primary"
            @click="checkAnswer(props.quiz, props.answer)">
            Check Answer
          </button>
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
        console.log(val)
      })
    }
  }
};
</script>

<style>
</style>
